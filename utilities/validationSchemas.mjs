export const postValidationSchema = {
title: {
    in: ["body"],
    trim: true,
    notEmpty:{
        errorMessage: "Post title can`t be empty"
    },
    isLength:{
        min: 5, 
        max: 100,
        errorMessage: "Post title should be between 5 and 100 characters."
    },
},

content: {
    in: ["body"],
    trim: true,
    notEmpty:{
        errorMessage: "Post content can`t be empty"
    },
    isLength:{
        min: 20, 
        max: 5000,
        errorMessage: "Post title should be between 20 and 5000 characters."
    },
}
};