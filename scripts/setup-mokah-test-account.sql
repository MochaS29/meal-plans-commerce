-- Setup test account for mokah@me.com with Mediterranean meal plan purchase
-- Password will be: TestPassword123!
-- Bcrypt hash generated for password: TestPassword123!

DO $$
DECLARE
    user_id_var UUID;
    password_hash_var VARCHAR(255) := '$2a$10$rXKZ5JH.TYqQQxGqwvXXb.VN5YV0KfF5HpBj9YvH6Z5xYJ0HqvzYC'; -- TestPassword123!
BEGIN
    -- Check if user already exists
    SELECT id INTO user_id_var
    FROM users
    WHERE email = 'mokah@me.com';

    -- If user doesn't exist, create them
    IF user_id_var IS NULL THEN
        INSERT INTO users (email, password_hash, name, created_at, updated_at)
        VALUES (
            'mokah@me.com',
            password_hash_var,
            'Mocha Test User',
            NOW(),
            NOW()
        )
        RETURNING id INTO user_id_var;

        RAISE NOTICE 'Created new user account for mokah@me.com';
    ELSE
        -- Update password hash if user exists
        UPDATE users
        SET password_hash = password_hash_var,
            updated_at = NOW()
        WHERE id = user_id_var;

        RAISE NOTICE 'Updated password for existing user mokah@me.com';
    END IF;

    -- Delete any existing test purchases for this user
    DELETE FROM user_purchases
    WHERE user_id = user_id_var
    AND stripe_session_id LIKE 'cs_test_%';

    -- Create a Mediterranean meal plan purchase
    INSERT INTO user_purchases (
        user_id,
        stripe_session_id,
        stripe_payment_intent_id,
        product_id,
        product_name,
        diet_plan,
        amount,
        currency,
        status,
        purchased_at,
        expires_at,
        created_at,
        updated_at
    ) VALUES (
        user_id_var,
        'cs_test_' || substr(md5(random()::text), 1, 24),
        'pi_test_' || substr(md5(random()::text), 1, 24),
        'mediterranean-30day',
        '30-Day Mediterranean Meal Plan',
        'mediterranean',
        7900,  -- $79.00 in cents
        'usd',
        'completed',
        NOW(),
        NOW() + INTERVAL '365 days',  -- Valid for 1 year for testing
        NOW(),
        NOW()
    );

    RAISE NOTICE '✅ Account setup complete!';
    RAISE NOTICE '';
    RAISE NOTICE '====================================';
    RAISE NOTICE 'Test Account Credentials';
    RAISE NOTICE '====================================';
    RAISE NOTICE 'Email: mokah@me.com';
    RAISE NOTICE 'Password: TestPassword123!';
    RAISE NOTICE '';
    RAISE NOTICE 'Purchase Details:';
    RAISE NOTICE '- Product: 30-Day Mediterranean Meal Plan';
    RAISE NOTICE '- Diet Plan: Mediterranean';
    RAISE NOTICE '- Status: Completed';
    RAISE NOTICE '- Valid Until: %', TO_CHAR(NOW() + INTERVAL '365 days', 'YYYY-MM-DD');
    RAISE NOTICE '';
    RAISE NOTICE 'Login at: http://localhost:3000/login';
    RAISE NOTICE '====================================';

END $$;

-- Verify the setup
SELECT
    u.email,
    u.name,
    u.created_at,
    COUNT(up.id) as total_purchases,
    STRING_AGG(up.diet_plan, ', ') as diet_plans
FROM users u
LEFT JOIN user_purchases up ON u.id = up.user_id AND up.status = 'completed'
WHERE u.email = 'mokah@me.com'
GROUP BY u.id, u.email, u.name, u.created_at;

-- Show purchase details
SELECT
    product_name,
    diet_plan,
    amount / 100.0 as amount_dollars,
    currency,
    status,
    TO_CHAR(purchased_at, 'YYYY-MM-DD HH24:MI:SS') as purchased_at,
    TO_CHAR(expires_at, 'YYYY-MM-DD') as expires_at
FROM user_purchases up
JOIN users u ON u.id = up.user_id
WHERE u.email = 'mokah@me.com'
ORDER BY up.purchased_at DESC;
