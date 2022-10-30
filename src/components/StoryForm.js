import React from 'react'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';



const StoryForm = () =>
{

    const initialValues = {
        story: [
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
            <h1>Invite story</h1>
            <p>Check the console to see the formik state.</p>
            <p>Reproduction</p>
            <ol>
                <li>Remove the first value of the form</li>
                <li>
                    Check the <code>touched</code> state in the console log
                </li>
                <li>
                    It indicates <code>touched.story: []</code> but one value was actually
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
                                name="story"
                                render={({ insert, remove, push }) => (
                                    <div>
                                        {values.story.length > 0 &&
                                            values.story.map((friend, index, story) => (
                                                <div className="row" key={index}>
                                                    {story[index].type === 1 ? <div className="col">
                                                        <label htmlFor={`story.${index}.name`}>Name</label>
                                                        <Field
                                                            name={`story.${index}.name`}
                                                            placeholder="Jane Doe"
                                                            type="text"
                                                        />
                                                        {errors.story &&
                                                            errors.story[index] &&
                                                            errors.story[index].name &&
                                                            touched.story &&
                                                            touched.story[index].name && (
                                                                <div className="field-error">
                                                                    {errors.story[index].name}
                                                                </div>
                                                            )}
                                                    </div>
                                                        : <div className="col">
                                                            <label htmlFor={`story.${index}.image`}>
                                                            image
                                                            </label>
                                                            <input
                                                                
                                                                type="file"
                                                                onChange={(event)=>{
                                                                    setFieldValue(`story.${index}.image`,event.target.files[0])
                                                                }}
                                                            />
                                                            {errors.story &&
                                                                errors.story[index] &&
                                                                errors.story[index].image &&
                                                                touched.story &&
                                                                touched.story[index].image && (
                                                                    <div className="field-error">
                                                                        {errors.story[index].image}
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