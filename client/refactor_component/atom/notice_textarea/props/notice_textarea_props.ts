import { ChangeEventHandler } from "react";
export default interface TextAreaProps {
    value: string;
    onChange: ChangeEventHandler<HTMLTextAreaElement>;
    name : string;
    id : string;
    placeholder : string;
    style : string;
}
