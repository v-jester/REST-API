const AppError = require("../utils/appError");
const conn = require("../services/db");

exports.getAllUsers = (req, res, next) => {
    conn.query("SELECT * FROM user", function (err, data, fields) {
        if (err) return next(new AppError(err));
        res.status(200).json({
            status: "success",
            length: data?.length,
            data: data,
        });
    });
};

exports.createUser = (req, res, next) => {
    if (!req.body) return next(new AppError("No form data found", 404));
    const values = [
        req.body.password,
        req.body.name,
        req.body.surname,
        req.body.nickname,
        req.body.email,
        req.body.picture,
        req.body.Role_id,
    ];
    conn.query(
        "INSERT INTO user (password, name, surname, nickname, email, picture, Role_id) VALUES(?)",
        [values],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "user added!",
            });
        }
    );
};

exports.getUserById = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No user id found", 404));
    }
    conn.query(
        "SELECT * FROM user WHERE id = ?",
        [req.params.id],
        function (err, data, fields) {
            if (data.length === 0) return next(new AppError(err, 404))
            if (err) return next(new AppError(err, 500));
            res.status(200).json({
                status: "success",
                length: data?.length,
                data: data,
            });
        }
    );
};

exports.updateUser = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No user id found", 404));
    }
    conn.query(
        "UPDATE user SET password=?, name=?, surname=?, nickname=?, email=?, picture=?, Role_id=? WHERE id=?",
        [
            req.body.password,
            req.body.name,
            req.body.surname,
            req.body.nickname,
            req.body.email,
            req.body.picture,
            req.body.Role_id,
            req.params.id,
        ],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "user info updated!",
            });
        }
    );
};

exports.deleteUser = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No todo id found", 404));
    }
    conn.query(
        "DELETE FROM User WHERE id=?",
        [req.params.id],
        function (err, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "user deleted!",
            });
        }
    );
};
