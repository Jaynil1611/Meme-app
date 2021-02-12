import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, FastField, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  Input,
  Error,
  Center,
  InputField,
  Wrapper,
} from "../styles/styles";
import "../styles/Home.css";
import Cat from "../assets/Cat.jpg";
import Card from "./Card";

// const memes = [
//   {
//     name: "Johnny Sins",
//     url:
//       "https://static.mommypoppins.com/styles/image620x420/s3/school_meme_3_1.jpg?itok=zJWEcZFx",
//     caption: "Coronavirus Lockdown",
//   },
//   {
//     name: "Johnny Sins",
//     url:
//       "https://static.mommypoppins.com/styles/image620x420/s3/school_meme_3_1.jpg?itok=zJWEcZFx",
//     caption: "Coronavirus Lockdown",
//   },
//   {
//     name: "Johnny Sins",
//     url:
//       "https://static.mommypoppins.com/styles/image620x420/s3/school_meme_3_1.jpg?itok=zJWEcZFx",
//     caption: "Coronavirus Lockdown",
//   },
// ];

const getMemes = async () => {
  let res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}`);
  return res.data;
};

export default function Home() {
  const [memes, setMemes] = useState([]);
  let res;

  useEffect(async (memes) => {
    res = await getMemes();
    setMemes(res);
  }, []);

  return (
    <div>
      <Wrapper>
        <div className="heading">
          <img className="heading-image" src={Cat} alt="Cat Meme" />
          <h2 className="heading-text">Enter Meme Details</h2>
        </div>
        <Formik
          initialValues={{
            name: "",
            url: "",
            caption: "",
            success: false,
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required("Name field is required"),
            url: Yup.string().required("URL field is required"),
            caption: Yup.string().required("Caption field is required"),
          })}
          onSubmit={async (
            { name, url, caption },
            { setSubmitting, resetForm, setFieldValue }
          ) => {
            try {
              await axios({
                method: "POST",
                url: `${process.env.REACT_APP_BACKEND_URL}`,
                headers: {
                  "Content-Type": "application/json",
                },
                data: JSON.stringify({
                  name,
                  url,
                  caption,
                }),
              });
              setSubmitting(false);
              setFieldValue("success", true);
              setTimeout(() => resetForm(), 8000);
            } catch (err) {
              setSubmitting(false);
              setFieldValue("success", false);
              alert("Something went wrong, please try again!");
            }
          }}
        >
          {({ values, touched, errors, isValid, dirty }) => (
            <Form>
              <InputField>
                <label>
                  Meme Creator
                  <Input
                    as={FastField}
                    type="text"
                    name="name"
                    component="input"
                    aria-label="name"
                    placeholder="What should I call you?"
                    error={touched.name && errors.name}
                  />
                </label>
                <ErrorMessage component={Error} name="name" />
              </InputField>
              <InputField>
                <label>
                  Meme Link
                  <Input
                    id="url"
                    aria-label="URL"
                    component="input"
                    as={FastField}
                    type="url"
                    name="url"
                    placeholder="Show me the Meme"
                    error={touched.url && errors.url}
                  />
                </label>
                <ErrorMessage component={Error} name="url" />
              </InputField>
              <InputField>
                <label>
                  Caption for Meme
                  <Input
                    as={FastField}
                    component="textarea"
                    aria-label="caption"
                    id="caption"
                    type="text"
                    name="caption"
                    placeholder="Give some context around your meme"
                    error={touched.caption && errors.caption}
                  />
                </label>
                <ErrorMessage component={Error} name="caption" />
              </InputField>
              {values.success && (
                <InputField>
                  <Center>
                    <h5>
                      Your meme has been successfully posted, check below to
                      view it.
                    </h5>
                  </Center>
                </InputField>
              )}
              <Center>
                <Button
                  secondary
                  type="submit"
                  disabled={!(isValid && dirty)}
                  className="submit-btn"
                >
                  Submit
                </Button>
              </Center>
            </Form>
          )}
        </Formik>
      </Wrapper>
      <div className="card-container">
        {memes.map((meme, index) => {
          return (
            <Card
              key={index}
              name={meme.name}
              url={meme.url}
              caption={meme.caption}
            />
          );
        })}
      </div>
    </div>
  );
}
