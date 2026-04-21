import { ArrowRight, Edit, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createPost, deletePost, getPosts, updatePost } from "@/services/post.services";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Field, FieldGroup } from "./ui/field";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

interface Post {
  id: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  published: string;
  url: string;
  image: string;
}

interface Blog7Props {
  tagline: string;
  heading: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  posts: Post[];
  className?: string;
}

const Blog7 = ({
  tagline = "Latest Updates",
  heading = "Blog",
  description = "Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.",
  className,
}: Blog7Props) => {
  const [editOpen, setEditOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [postId, setPostId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  })

  const [updateFormData, setUpdateFormData ] = useState({
    title: "",
    description: ""
  })

  const { data, refetch } = useQuery({
    queryKey: ["get-posts"],
    queryFn: getPosts
  })
  const posts = data?.data?.data;

  const { mutate: postCreate } = useMutation({
    mutationKey: ["create-post"],
    mutationFn: () => createPost(formData),
    onSuccess: () => {
      refetch();
      setFormData({
        title: "",
        description: ""
      })
      toast("Post created successfully!");
    },
    onError: (error) => {
      toast("Post creation failed, Please try again later!");
      console.log("Error while creating the post", error.message)
    }
  })

  const { mutate: postUpdate } = useMutation({
    mutationKey: ["update-post"],
    mutationFn: () => updatePost({updateFormData, postId}),
    onSuccess: () => {
      refetch();
      setUpdateFormData({
        title: "",
        description: ""
      })
      toast("Post updated successfully!");
    },
    onError: (error:any) => {
      toast("Post creation failed, Please try again later!");
      console.log("Error while creating the post", error.message)
    }
  })

  const { mutate: postDelete } = useMutation({
    mutationKey: ["delete-post"],
    mutationFn: (postId) => deletePost(postId),
    onSuccess: () => {
      refetch();
      setUpdateFormData({
        title: "",
        description: ""
      })
      toast("Post deleted successfully!");
    },
    onError: (error:any) => {
      toast("Post Deletion failed, Please try again later!");
      console.log("Error while deleting the post", error.message)
    }
  })

  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleUpdateChange = (e: any) => {
    const {name, value} = e.target;
    setUpdateFormData({
      ...updateFormData,
      [name]: value
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    postCreate();
  }
  const handleUpdateSubmit = (e: any) => {
    e.preventDefault();
    postUpdate();
  }
  return (
    <section className={cn("py-32", className)}>
      <div className="container mx-auto flex flex-col items-center gap-8">
        <div className="text-center">
          <Badge variant="secondary" className="mb-6">
            {tagline}
          </Badge>
          <h2 className="mb-3 text-5xl tracking-tighter text-pretty md:mb-4 lg:mb-6 lg:max-w-3xl lg:text-7xl">
            {heading}
          </h2>
          <p className="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg">
            {description}
          </p>
        </div>
        <div>
                <Button variant="outline" onClick={() => setCreateOpen(true)}>Create Post</Button>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
              <DialogContent className="w-full">
              <form method="POST" onSubmit={(e) => handleSubmit(e)}>
                <FieldGroup>
                  <Field>
                    <Label htmlFor="name">Title</Label>
                    <Input
                      id="title" 
                      name="title" 
                      value={formData.title}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </Field>
                  <Field>
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      name="description"
                      value={formData.description}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </Field>
                </FieldGroup>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </form>
              </DialogContent>
          </Dialog>
        </div>
        <div className="gap-6 space-y-6 ps-10">
          {posts?.map((post: any) => (
            <Card
              key={post?._id}
              className="w-5xl"
            >
              <CardHeader className="">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-xl hover:underline md:text-xl">
                      {post?.title}
                    </h3>
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={() => postDelete(post?._id)}>
                      <Trash2 />
                    </Button>
                    <Button onClick={() => {setEditOpen(true); setUpdateFormData({
                      title: post?.title,
                      description: post?.description
                    }); setPostId(post?._id)}}>
                      <Edit />
                    </Button>
                    <Dialog open={editOpen} onOpenChange={setEditOpen}>
                      <DialogContent className="w-full">
                      <form method="POST" onSubmit={(e) => handleUpdateSubmit(e)}>
                        <FieldGroup>
                          <Field>
                            <Label htmlFor="name">Title</Label>
                            <Input
                              id="title" 
                              name="title" 
                              value={updateFormData?.title}
                              onChange={(e) => handleUpdateChange(e)}
                              required
                            />
                          </Field>
                          <Field>
                            <Label htmlFor="description">Description</Label>
                            <Textarea 
                              id="description" 
                              name="description"
                              value={updateFormData?.description}
                              onChange={(e) => handleUpdateChange(e)}
                              required
                            />
                          </Field>
                        </FieldGroup>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button type="submit">Save changes</Button>
                        </DialogFooter>
                      </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground w-[200px] truncate">
                  {post?.description}
                </p>
              </CardContent>
              <CardFooter>
                <a
                  href={post.url}
                  target="_blank"
                  className="flex items-center text-muted-foreground hover:underline"
                >
                  Read more
                  <ArrowRight className="ml-1 size-4" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Blog7 };
