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
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loader from "@/components/ui/Loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChangeEvent, FormEvent, useState } from "react";
import { image } from "@nextui-org/react";


const Home = () => {
  const [selectedImage, setSelectedImage] = useState<{
    img: File | null;
    oddType: string;
  }>({
    img: null,
    oddType: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", selectedImage?.img || "null")
    
    try {
      const response = await fetch(`/api/odds/${selectedImage.oddType}`, {
        method: 'POST',
        body: formData
      })

      if(response){
        setIsLoading(false);
        toast({
          description: "image uploaded"
        })
      }

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
      {
        !isLoading ? (
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
                    <SelectItem value="three straight draw">three straight draw</SelectItem>
                    <SelectItem value="five odds">five odds</SelectItem>
                    <SelectItem value="midnightbasketball">midnightbasketball</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <CardFooter className="flex justify-between p-0 pt-5 ">
              <Button type="submit"
              >Upload</Button>
            </CardFooter>
          </form>
        </CardContent>
        
      </Card>
        ) : (
          <Loader/>
        )
      }
      
    </div>
  );
};

export default Home;


