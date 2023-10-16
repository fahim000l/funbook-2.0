import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { IMedia } from "@/db/models/Media";

interface props {
  itemData: IMedia[];
}

export default function ImageGrid({ itemData }: props) {
  return (
    <Box sx={{ height: itemData?.length > 3 ? 450 : 250, overflowY: "hidden" }}>
      <ImageList
        variant="masonry"
        cols={itemData?.length == 1 ? 1 : itemData?.length === 2 ? 2 : 3}
        gap={8}
      >
        {itemData.map((item) => (
          <ImageListItem key={item._id}>
            {/* <img  className="rounded-lg" src={item.src} alt="" /> */}
            <img
              className="rounded-lg"
              srcSet={item.src}
              src={item.src}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}
