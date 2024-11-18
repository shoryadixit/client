"use client";

import CustomDropzone from "@/components/CustomDropzone";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { MdCancel } from "react-icons/md";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  const [file, setFile] = useState([]);
  const router = useRouter();
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  const validationSchema = yup.object({
    title: yup.string().required("Title is required"),
    description: yup
      .string()
      .required("Description is required")
      .test("no-code", "Code or script content is not allowed", (value) => {
        const codePatterns = [
          /<script/i,
          /<\/script>/i,
          /<style/i,
          /<\/style>/i,
          /<\?php/i,
          /function\s*\(/,
          /class\s+\w+/,
          /if\s*\(/,
          /for\s*\(/,
          /while\s*\(/,
          /\beval\(/,
          /\bexec\(/,
          /\bsystem\(/,
        ];
        return !codePatterns.some((pattern) => pattern.test(value));
      }),
  });

  const formik = useFormik({
    initialValues: {
      description: "",
      title: "",
      file: [],
      tags: [],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Values ==> ", values);
      formik.setSubmitting(true);
      const promise = new Promise(async (res, rej) => {
        await fetch("/api/addCar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              formik.setSubmitting(false);
              res(data);
              router.push("/");
            } else {
              rej(data);
            }
          })
          .catch((error) => {
            formik.setSubmitting(false);
            rej(error);
          });
      });

      toast.promise(promise, {
        loading: "Adding Car...",
        success: (response) => response.message,
        error: (response) => response.message,
      });
    },
  });

  useEffect(() => {
    formik.setFieldValue("tags", tags);
  }, [tags]);

  useEffect(() => {
    if (file.length > 0) {
      const totalFiles = formik.values.file.length + file.length;
      if (totalFiles <= 10) {
        formik.setFieldValue("file", [...formik.values.file, ...file]);
      } else {
        const remainingFiles = 10 - formik.values.file.length;
        formik.setFieldValue("file", [
          ...formik.values.file,
          ...file.slice(0, remainingFiles),
        ]);
        toast.error(
          `You can only upload up to 10 files. ${
            file.length - remainingFiles
          } files were not uploaded.`
        );
      }
      setFile([]);
    }
  }, [file]);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div>
      <div className="p-8">
        <form onSubmit={formik.handleSubmit}>
          <Card className="w-full sm:w-[650px] md:w-[750px] lg:w-[950px] mx-auto mb-8 shadow-xl">
            <CardHeader>
              <CardTitle>Add Car</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid w-full gap-1.5 mb-4">
                <Label htmlFor="title">Title</Label>
                <Input
                  placeholder="Type your message here."
                  id="title"
                  name="title"
                  onChange={formik.handleChange}
                />
                {formik.errors.title && formik.touched.title && (
                  <p className="text-xs text-red-500 font-bold text-muted-foreground">
                    {formik.errors.title}
                  </p>
                )}
              </div>
              <div className="grid w-full gap-1.5 mb-4">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Add a tag"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    // onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                  />
                  <Button type="button" onClick={handleAddTag}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant={"outline"}
                      className="flex items-center gap-2"
                    >
                      #{tag}
                      <MdCancel
                        size={16}
                        className="cursor-pointer text-red-500"
                        onClick={() => handleRemoveTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="grid w-full gap-1.5 mb-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  placeholder="Type your message here."
                  id="description"
                  name="description"
                  onChange={formik.handleChange}
                  rows={10}
                  style={{
                    resize: "none",
                  }}
                />
                {formik.errors.description && formik.touched.description && (
                  <p className="text-xs text-red-500 font-bold text-muted-foreground">
                    {formik.errors.description}
                  </p>
                )}
                <p className="text-sm text-muted-foreground">
                  Enter the car description!!!
                </p>
              </div>
              <div className="flex items-center justify-start gap-4 flex-wrap">
                {/* Display the uploaded image if available */}
                {formik.values.file &&
                  formik.values.file.map((item, index) => (
                    <div
                      key={index}
                      className="flex relative flex-col items-start mb-4 w-fit"
                    >
                      <Image
                        src={item?.url}
                        alt={item.fileName || "Uploaded file preview"}
                        width={100}
                        height={100}
                        className="max-h-40 mb-2 rounded-xl border my-2"
                        style={{ width: "auto", height: "auto" }}
                      />
                      <div className="absolute top-0 -right-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger
                              onClick={() => {
                                const files = formik.values.file.filter(
                                  (obj) => obj.url !== item.url
                                );
                                formik.setFieldValue("file", files);
                              }}
                            >
                              <MdCancel size="18px" color="red" />
                            </TooltipTrigger>
                            <TooltipContent>Remove</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  ))}
              </div>

              {/* {!file.url && ( */}
              <div className="flex flex-col w-full h-20">
                <CustomDropzone setFile={setFile} />
              </div>
              {/* )} */}
            </CardContent>

            <CardFooter>
              <div className="flex w-full items-center justify-end gap-4">
                <Button
                  // disabled={formik.isSubmitting}
                  type="reset"
                  variant="secondary"
                >
                  Reset
                </Button>
                <Button type="submit">Create</Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
