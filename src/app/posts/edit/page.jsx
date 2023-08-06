"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@/app/components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");

  const [post, setPost] = useState({ title: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const getPostDetails = async () => {
      const response = await fetch(`http://localhost:3001/api/posts/${postId}`);
      const data = await response.json();

      setPost({
        title: data.title,
      });
    };

    if (postId) getPostDetails();
  }, [postId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!postId) return alert("Missing PostId!");

    try {
      const response = await fetch(`http://localhost:3001/api/posts/${postId}`, {
        method: "PATCH",
		    headers: {
			"Content-type": "application/json"
		},
        body: JSON.stringify({
          title: post.title,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;