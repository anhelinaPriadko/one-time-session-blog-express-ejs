export const postValidationSchema = {
title: {
    trim: true,
    isLength:{
        min: 5, 
        max: 100,
        errorMessage: "Post title should be between 5 and 100 characters."
    },
},

content: {
    trim: true,
    isLength:{
        min: 20, 
        max: 5000,
        errorMessage: "Post title should be between 20 and 5000 characters."
    },
}
};