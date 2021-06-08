import useAlert from "hooks/useAlert";
import React, { FC, useEffect } from "react";
import { IconButton } from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";

interface IProps {
  onClick: () => void;
}

const DeleteButton: FC<IProps> = ({ onClick }) => {
  const [alert, close] = useAlert();
  useEffect(() => close(), [close]);

  return (
    <IconButton
      onClick={() => {
        alert({
          title: "Delete",
          message: "Are you sure you want to delete class?",
          actions: [
            {
              text: "Cancel"
            },
            {
              text: "Delete",
              style: "primary",
              onPress: onClick
            }
          ]
        });
      }}
    >
      <DeleteOutlined />
    </IconButton>
  );
};

export default DeleteButton;
