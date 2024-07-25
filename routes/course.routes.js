import {Router} from "express";
import { UpdateCourse, addLecturestoCourseById, courseCreate, deleteCourse, getAllCourses, getlecturesbycourseid } from "../controllers/course.controller.js";
import { authorizedRoles, isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router=Router();

router.route('/')
    .get(getAllCourses)
    .post(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        upload.single("thumbnail"),
        courseCreate
        )

router.route('/:id')
    .get(isLoggedIn,getlecturesbycourseid)
    .put(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        UpdateCourse
        )
    .delete(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        deleteCourse
        )
    .post(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        upload.single("lecture"),
        addLecturestoCourseById
    )

export default router;