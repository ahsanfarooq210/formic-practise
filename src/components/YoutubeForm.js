import React from 'react'
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';



const YoutubeForm = () =>
{

    const initialValues = {
        friends: [
            {
                name: '',
                email: '',
                image: {},
            },
        ],
    };

    return (
        <div>
            <h1>Invite friends</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={async (values) =>
                {
                    console.log(values)
                }}
            >
                {({ values,setFieldValue }) => (
                    <Form>
                        <FieldArray name="friends">
                            {({ insert, remove, push }) => (
                                <div>
                                    {values.friends.length > 0 &&
                                        values.friends.map((friend, index) => (
                                            
                                            <div className="row" key={index}>
                                            {/* {console.log(friend)} */}
                                                <div className="col">
                                                    <label htmlFor={`friends.${index}.name`}>Name</label>
                                                    <Field
                                                        name={`friends.${index}.name`}
                                                        placeholder="Jane Doe"
                                                        type="text"
                                                    />
                                                    <ErrorMessage
                                                        name={`friends.${index}.name`}
                                                        component="div"
                                                        className="field-error"
                                                    />
                                                </div>
                                                <div className="col">
                                                    <label htmlFor={`friends.${index}.email`}>Email</label>
                                                    <input

                                                        type="file"
                                                        onChange={(event)=>{
                                                            setFieldValue(`friends.${index}.image`,event.target.files[0])
                                                        }}
                                                    />
                                                    <ErrorMessage
                                                        name={`friends.${index}.name`}
                                                        component="div"
                                                        className="field-error"
                                                    />
                                                </div>

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
                                        onClick={() => push({ name: '', email: '' })}
                                    >
                                        Add Friend
                                    </button>

                                    <button
                                        type="button"
                                        className="secondary"
                                        onClick={() => push({ image:{} })}
                                    >
                                        Add image
                                    </button>
                                </div>
                            )}
                        </FieldArray>
                        <button type="submit">Invite</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default YoutubeForm