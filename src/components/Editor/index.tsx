import React, { FC } from "react";
import { upload } from "utils/cloudinary";
import { Editor, IAllProps } from "@tinymce/tinymce-react";

declare const tinyMCE: any;

interface IProps extends IAllProps {
  height?: number;
  placeholder?: string;
}

const Wrapper: FC<IProps> = props => {
  const height = props.height || 320;
  return (
    <Editor
      apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
      init={{
        height,
        menubar: false,
        file_picker_types: "image",
        plugins: [
          "advlist autolink lists link image preview anchor table paste",
          "visualblocks code insertdatetime media code help wordcount"
        ],
        toolbar:
          "undo redo | formatselect | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image | removeformat | code | preview |help",
        file_picker_callback: (callback: any, value: any, meta: any) => {
          const input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "image/*");

          input.onchange = async () => {
            if (input.files && input.files[0]) {
              const url = await upload(input.files[0]);
              callback(url);
            }
          };
          input.click();
        },
        setup: (editor: any) => {
          if (props.placeholder) {
            editor.on("init", () => {
              const area = editor.getContentAreaContainer();
              const span = tinyMCE.DOM.add(
                area,
                "span",
                {
                  style: {
                    top: "1em",
                    left: "1em",
                    color: "#888",
                    position: "absolute"
                  }
                },
                props.placeholder
              );

              _onBlur();

              editor.on("blur", _onBlur);
              editor.on("focus", _onFocus);
              editor.on("keydown", _onKeyDown);
              editor.on("setContent", _onBlur);
              tinyMCE.DOM.bind(span, "click", _onFocus);

              function _onBlur() {
                if (editor.getContent() === "") {
                  tinyMCE.DOM.setStyle(span, "display", "");
                } else {
                  tinyMCE.DOM.setStyle(span, "display", "none");
                }
              }

              function _onFocus() {
                tinyMCE.DOM.setStyle(span, "display", "none");
                editor.execCommand("mceFocus", false);
              }

              function _onKeyDown() {
                tinyMCE.DOM.setStyle(span, "display", "none");
              }
            });
          }
        }
      }}
      {...props}
    />
  );
};

export default Wrapper;
