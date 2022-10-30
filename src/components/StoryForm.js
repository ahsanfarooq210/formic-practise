import React from 'react'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';



const StoryForm = () =>
{

    const initialValues = {
        friends: [
            {
                type: 1,
                name: "Klaus"
            },
            {
                type: 2,
                image: {}
            }
        ]
    };

    return (
        <div>
            <h1>Invite friends</h1>
            <p>Check the console to see the formik state.</p>
            <p>Reproduction</p>
            <ol>
                <li>Remove the first value of the form</li>
                <li>
                    Check the <code>touched</code> state in the console log
                </li>
                <li>
                    It indicates <code>touched.friends: []</code> but one value was actually
                    touched
                </li>
            </ol>
            <Formik
                initialValues={initialValues}
                validate={() => ({ foo: true })}
                onSubmit={values =>
                {
                    setTimeout(() =>
                    {
                        alert(JSON.stringify(values, null, 2));
                    }, 500);
                }}
                render={({ values, errors, touched, handleReset,setFieldValue }) =>
                {
                    console.group("formik");
                    console.log("touched", touched);
                    console.log("values", values);
                    console.groupEnd("formik");
                    return (
                        <Form>
                            <FieldArray
                                name="friends"
                                render={({ insert, remove, push }) => (
                                    <div>
                                        {values.friends.length > 0 &&
                                            values.friends.map((friend, index, friends) => (
                                                <div className="row" key={index}>
                                                    {friends[index].type === 1 ? <div className="col">
                                                        <label htmlFor={`friends.${index}.name`}>Name</label>
                                                        <Field
                                                            name={`friends.${index}.name`}
                                                            placeholder="Jane Doe"
                                                            type="text"
                                                        />
                                                        {errors.friends &&
                                                            errors.friends[index] &&
                                                            errors.friends[index].name &&
                                                            touched.friends &&
                                                            touched.friends[index].name && (
                                                                <div className="field-error">
                                                                    {errors.friends[index].name}
                                                                </div>
                                                            )}
                                                    </div>
                                                        : <div className="col">
                                                            <label htmlFor={`friends.${index}.image`}>
                                                            image
                                                            </label>
                                                            <input
                                                                
                                                                type="file"
                                                                onChange={(event)=>{
                                                                    setFieldValue(`friends.${index}.image`,event.target.files[0])
                                                                }}
                                                            />
                                                            {errors.friends &&
                                                                errors.friends[index] &&
                                                                errors.friends[index].image &&
                                                                touched.friends &&
                                                                touched.friends[index].image && (
                                                                    <div className="field-error">
                                                                        {errors.friends[index].image}
                                                                    </div>
                                                                )}
                                                        </div>}
                                                    <div className="col">
                                                        <button
                                                            type="button"
                                                            className="secondary"
                                                            onClick={() => remove(index)}
                                                        >
                                                            X
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        <button
                                            type="button"
                                            className="secondary"
                                            onClick={() => push({ type: 1, name: "" })}
                                        >
                                            Add Name
                                        </button>
                                        <button
                                            type="button"
                                            className="secondary"
                                            onClick={() => push({ type: 2, image: {} })}
                                        >
                                            Add image
                                        </button>
                                    </div>
                                )}
                            />
                            <br />
                            <button
                                onClick={event =>
                                {
                                    event.preventDefault();
                                    handleReset();
                                }}
                            >
                                Reset
                            </button>
                            <button type="submit">Submit</button>
                        </Form>
                    );
                }}
            />
        </div>
    )
}

export default StoryForm