import React from "react";

export default function useErrorManager() {
    const [errors, setErrors] = React.useState(new Map());

    // Function to add an error
    const addError = (error, type) => {
        setErrors((prevErrors) => new Map([...prevErrors, [error, type]]));
    };

    // Function to add an error of type input error
    const addInputError = (error) => {
        addError(error, 'Input');
	};

    // Function to remove an error
    const removeError = (error) => {
        setErrors((prevErrors) => {
            const newErrors = new Map(prevErrors);
            newErrors.delete(error);
            return newErrors;
        });
    };

    // Function to clear all errors
    const clearErrors = () => {
        setErrors(new Map());
    };

    // Function to check if there are any errors
    const hasErrors = (type) => {
        if (type){
            return Array
                    .from(errors)
                    .filter(el => el[1] === type)
                    .length > 0;
        }
        return errors.size > 0;
    }

	const hasThisError = (error) => {
		return Array
				.from(errors)
				.filter(el => el[0] === error)
				.length > 0;
	}

    // Function to check if there are errors of type input
    const hasInputErrors = () => {
        return hasErrors('Input');
    }

    // Function to get first error
    const getFirstError = () => {
        const [first] = Array.from(errors);

        if (first)
            return first[0];
        return undefined;
    }

    // Function to focus on first error
    // const focusOnError = () => {
    //     const [first] = errors;

    //     if (first && first[1]) {
    //         first[1].ref.current.focus();
    //     }
    // }

    return {
        errors: Array.from(errors),
        addError,
        addInputError,
        removeError,
        clearErrors,
        hasErrors,
		hasThisError,
        hasInputErrors,
        getFirstError
        // focusOnError
    };
}


