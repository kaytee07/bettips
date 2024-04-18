"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChangeEvent, FormEvent, useState } from "react";

const Home = () => {
  const [selectedImage, setSelectedImage] = useState<{
    img: File | null;
    oddType: string;
  }>({
    img: null,
    oddType: "",
  });

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", selectedImage?.img || "null")
    
    try {
      const response = await fetch(`/api/odds/${selectedImage.oddType}`, {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        console.log(response)
      } else {
        console.error("Image upload failed")
      }
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  };


  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];
    setSelectedImage((prevImage) => ({
      ...prevImage,
      img: imageFile || null,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Upload Image</CardTitle>
          <CardDescription>Select oddtype and upload bet slip</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="slip">Upload slip</Label>
                <Input
                  onChange={handleImageChange}
                  type="file"
                  id="slip"
                  placeholder="Name of your project"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Oddtype</Label>
                <Select onValueChange={(value) => {
                  setSelectedImage((prevImage) => ({
                    ...prevImage,
                    oddType: value
                  }))
                }}>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="two odds">two odds</SelectItem>
                    <SelectItem value="five odds">five odds</SelectItem>
                    <SelectItem value="seven odds">seven odds</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <CardFooter className="flex justify-between p-0 pt-5 ">
              <Button type="submit">Upload</Button>
            </CardFooter>
          </form>
        </CardContent>
        
      </Card>
      <p>Home</p>
    </div>
  );
};

export default Home;


