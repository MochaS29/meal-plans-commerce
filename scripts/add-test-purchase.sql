-- Add a test purchase for mokah@me.com account
-- This simulates a completed purchase of the 30-Day Wellness Transformation (Mediterranean)

-- First, get the user ID for mokah@me.com
DO $$
DECLARE
    user_id_var UUID;
BEGIN
    -- Get the user ID
    SELECT id INTO user_id_var
    FROM users
    WHERE email = 'mokah@me.com'
    LIMIT 1;

    -- Check if user exists
    IF user_id_var IS NULL THEN
        RAISE NOTICE 'User mokah@me.com not found';
        RETURN;
    END IF;

    -- Insert a test purchase
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
        expires_at
    ) VALUES (
        user_id_var,
        'cs_test_' || substr(md5(random()::text), 1, 24),  -- Simulated Stripe session ID
        'pi_test_' || substr(md5(random()::text), 1, 24),  -- Simulated payment intent
        'wellness-transformation',
        '30-Day Wellness Transformation',
        'mediterranean',
        7900,  -- $79.00 CAD in cents
        'cad',
        'completed',
        NOW(),
        NOW() + INTERVAL '30 days'  -- Valid for 30 days
    );

    -- Also add a customer tracking record
    INSERT INTO customer_tracking (
        email,
        product_id,
        diet_plan,
        purchase_date,
        stripe_session_id,
        amount
    ) VALUES (
        'mokah@me.com',
        'wellness-transformation',
        'mediterranean',
        NOW(),
        'cs_test_' || substr(md5(random()::text), 1, 24),
        79.00
    ) ON CONFLICT (email) DO UPDATE SET
        product_id = EXCLUDED.product_id,
        diet_plan = EXCLUDED.diet_plan,
        purchase_date = EXCLUDED.purchase_date,
        amount = EXCLUDED.amount;

    RAISE NOTICE 'Test purchase added successfully for mokah@me.com';

    -- Display the purchase details
    RAISE NOTICE 'Purchase Details:';
    RAISE NOTICE '- Product: 30-Day Wellness Transformation';
    RAISE NOTICE '- Diet Plan: Mediterranean';
    RAISE NOTICE '- Amount: $79.00 CAD';
    RAISE NOTICE '- Status: Completed';
    RAISE NOTICE '- Valid Until: %', NOW() + INTERVAL '30 days';
END $$;

-- Query to verify the purchase
SELECT
    u.email,
    up.product_name,
    up.diet_plan,
    up.amount / 100.0 as amount_dollars,
    up.currency,
    up.status,
    up.purchased_at,
    up.expires_at
FROM user_purchases up
JOIN users u ON u.id = up.user_id
WHERE u.email = 'mokah@me.com'
ORDER BY up.purchased_at DESC;