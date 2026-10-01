const User = require('./user.model');
const Course = require('./course.model');
const Lesson = require('./lesson.model');
const Enrollment = require('./enrollment.model');

User.hasMany(Course, {
    foreignKey: 'instructorId',
    as: 'courses'
});

Course.belongsTo(User, {
    foreignKey: 'instructorId',
    as: 'instructor'
});


Course.hasMany(Lesson, {
    foreignKey: 'courseId',
    as: 'lessons',
    onDelete: 'Cascade'
});

Lesson.belongsTo(Course, {
    foreignKey: 'courseId',
    as: 'course'
});

User.belongsToMany(Course, {
    through: Enrollment,
    foreignKey: 'userId',
    otherKey: 'courseId',
    as: 'enrolledCourses'
});

Course.belongsToMany(User, {
    through: Enrollment,
    foreignKey: 'courseId',
    otherKey: 'userId',
    as: 'students'
});

Enrollment.belongsTo(User, {
    foreignKey: 'userId'
});

Enrollment.belongsTo(Course, {
    foreignKey: 'courseId',
});

module.exports = {
    User,
    Course,
    Lesson,
    Enrollment
};