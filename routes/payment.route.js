import Router from "express"
import { allPayments, buySubsciption, cancelSubscription, getRazorpayApiKey, verifySubscription } from "../controllers/payment.controller.js";
import { authorizedRoles, isLoggedIn } from "../middlewares/auth.middleware.js";

const router=Router();

router.route('/razorpay_key')
    .get(
        isLoggedIn,
        getRazorpayApiKey
    )

router
    .route('/subscribe')
    .post(
        isLoggedIn,
        buySubsciption
    )

router
    .route('/verify')
    .post(
        isLoggedIn,
        verifySubscription
    )

router
    .route('/unsubscribe')
    .post(
        isLoggedIn,
        cancelSubscription
    )

router
    .router('/')
    .get(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        allPayments
    )

export default router;