import MyButton from "./MyButton";

export default {
    title: "MyButton",
    component: MyButton
};

const Template = (arg: any) => <MyButton {...arg} />;

export const Default: any = Template.bind({});

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
Default.args = {
    children: "Click",
    size: "small"
};
