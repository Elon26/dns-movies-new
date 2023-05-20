import MyInput from "./MyInput";

export default {
    title: "MyInput",
    component: MyInput
};
const Template = (arg: any) => <MyInput {...arg} />;

export const Default: any = Template.bind({});

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
Default.args = {
    children: "Click",
    size: "small"
};
