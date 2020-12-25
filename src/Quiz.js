import React from 'react'

import { Formik, Form, useField, FieldArray, Field } from "formik"
import { Button, Checkbox, FormControlLabel, MenuItem, Radio, Select, TextField } from "@material-ui/core"

const MyRadio = ({ label, ...props }) => {
    const [field] = useField(props)
    return (
        <FormControlLabel {...field} control={<Radio />} label={label} />
    )
}
const MyCheckBox = ({ label, ...props }) => {
    const [field] = useField(props)
    return (
        <FormControlLabel {...field} control={<Checkbox />} label={label} />
    )
}
const MyTextField = ({ placeholder, type, ...props }) => {
    const [field] = useField(props)
    return (
        <TextField placeholder={placeholder} type={type} {...field} />
    )
}


function Quiz() {
    return (
        <div>
            <Formik
                initialValues={{
                    firstquestion: "",
                    secondquestion: [{ type: "", id: "" + Math.random() }],
                    thirdquestion: [],
                    fourthquestion: ""
                }}

                onSubmit={(data, { setSubmitting }) => {
                    //async request
                    setSubmitting(true)
                    console.log("question: ", data)
                    setSubmitting(false)
                }}
            >
                {({ values, errors, isSubmitting }) => (
                    <Form>
                        <div>
                            <h1>Question 1</h1>
                            <p>Who invented JavaScript?</p>
                            <MyRadio name="firstquestion" type="radio" value="Douglas Crockford" label="Douglas Crockford" />
                            <MyRadio name="firstquestion" type="radio" value="Sheryl Sandberg" label="Sheryl Sandberg" />
                            <MyRadio name="firstquestion" type="radio" value="Brendan Eich" label="Brendan Eich" />
                            <MyRadio name="firstquestion" type="radio" value="Olamilekan" label="Olamilekan" />
                        </div>
                        <div>
                            <h1>Question 2</h1>
                            <p>Which one of these is a JavaScript package manager?</p>
                            <FieldArray name="secondquestion" >
                                {
                                    <div>
                                        {values.secondquestion.map((quest, index) => {
                                            return (
                                                <div key={quest.id}>
                                                    <Field
                                                        name={`secondquestion.${index}.type`}
                                                        type="Select"
                                                        as={Select}
                                                    >
                                                        <MenuItem value="Node.js" >Node.js</MenuItem>
                                                        <MenuItem value="TypeScript" >TypeScript</MenuItem>
                                                        <MenuItem value="Npm" >Npm</MenuItem>
                                                        <MenuItem value="Football Manager" >Football Manager</MenuItem>
                                                    </Field>
                                                </div>
                                            )
                                        })
                                        }
                                    </div>
                                }
                            </FieldArray>
                        </div>
                        <div>
                            <h1>Question 3</h1>
                            <p>Which tool can you use to ensure code quality?</p>
                            <MyCheckBox name="thirdquestion" type="checkbox" value="Angular" label="Angular" />
                            <MyCheckBox name="thirdquestion" type="checkbox" value="jQuery" label="jQuery" />
                            <MyCheckBox name="thirdquestion" type="checkbox" value="RequireJS" label="RequireJS" />
                            <MyCheckBox name="thirdquestion" type="checkbox" value="ESLint" label="EsLint" />
                        </div>
                        <div>
                            <h1>Question 4</h1>
                            <p>Enter a valid email address</p>
                            <MyTextField placeholder="Email Adress" name="fourthquestion" type="email" />
                        </div>

                        <div>
                            <Button disabled={isSubmitting} type="submit" >Submit</Button>
                        </div>
                        <pre>{JSON.stringify(values, null, 2)}</pre>
                        <pre>{JSON.stringify(errors, null, 2)}</pre>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Quiz
