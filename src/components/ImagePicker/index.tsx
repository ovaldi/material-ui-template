import React, {
  FC,
  InputHTMLAttributes,
  HTMLProps,
  useEffect,
  useState
} from "react";
import { useTheme, Button, Icon, Typography } from "@material-ui/core";
import { ButtonProps } from "@material-ui/core/Button";

export interface ImagePickerProps
  extends InputHTMLAttributes<HTMLInputElement> {
  rootProps?: HTMLProps<HTMLDivElement>;
  label?: string;
  image?: string;
  buttonProps?: ButtonProps;
  onFile?: (file: File) => void;
}

const ImagePicker: FC<ImagePickerProps> = ({
  rootProps = {},
  label = "",
  buttonProps = {},
  image,
  onFile,
  style,
  onChange,
  children,
  ...rest
}) => {
  const theme = useTheme();
  const [path, setPath] = useState(image);

  useEffect(() => {
    setPath(image);
  }, [image]);

  return (
    <section
      {...rootProps}
      style={{
        display: "flex",
        flexDirection: "column",
        ...rootProps.style
      }}
    >
      <Typography color="textSecondary" gutterBottom>
        {label}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        style={{
          width: theme.spacing(15),
          minHeight: theme.spacing(15),
          ...buttonProps.style
        }}
        {...buttonProps}
      >
        {path ? <img alt="preview" src={path} /> : <Icon>image</Icon>}
        <input
          {...rest}
          accept="image/*"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            opacity: 0,
            width: "100%",
            ...style
          }}
          onChange={event => {
            if (event.target.files && event.target.files[0]) {
              const reader = new FileReader();

              reader.onload = e => {
                if (e.target && e.target.result) {
                  setPath(e.target.result.toString());
                }
              };

              reader.readAsDataURL(event.target.files[0]);

              if (onFile) {
                onFile(event.target.files[0]);
              }
            }
            if (onChange) {
              onChange(event);
            }
          }}
          type="file"
        />
      </Button>
      <Typography
        variant="body2"
        color="textSecondary"
        style={{ marginTop: 8, paddingLeft: 8, fontSize: 8 }}
      >
        Max file size: 10M
      </Typography>
      {children}
    </section>
  );
};

export default ImagePicker;
