import Toggle from "./Toggle";

export default {
    title: "Toggle",
    component: Toggle
};

const Template = (arg: any) => {
    return <Toggle {...arg}></Toggle>;
};

export const Default: any = Template.bind({});

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
Default.args = {
    children: "Click",
    nameBtn: "small"
};
