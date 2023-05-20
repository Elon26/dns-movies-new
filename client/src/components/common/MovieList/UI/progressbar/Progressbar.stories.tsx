import Progressbar from "./Progressbar";

export default {
    title: "Progressbar;",
    component: Progressbar
};

const Template = (arg: any) => {
    return <Progressbar {...arg}></Progressbar>;
};
export const Default: any = Template.bind({});

Default.args = {};
