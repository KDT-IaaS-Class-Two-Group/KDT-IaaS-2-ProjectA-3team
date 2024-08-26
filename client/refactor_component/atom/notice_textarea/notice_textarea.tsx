import TextAreaProps from "./props/notice_textarea_props";

const TextArea: React.FC<TextAreaProps> = ({
    value,
    onChange,
    name,
    id,
    placeholder,
    style,
}) => {
    return (
        <textarea
            value={value}
            onChange={onChange}
            name={name}
            id={id}
            placeholder={placeholder}
            className={style}
        />
    );
};

export default TextArea;