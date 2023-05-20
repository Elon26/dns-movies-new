import ButtonPromo from "./ButtonPromo";

export default {
    title: "ButtonPromo",
    component: ButtonPromo
};

const style = {
    width: 500,
    height: 48,
    display: "grid",
    gridTemplateColumns: "1fr"
};

export const Default = () => (
    <div style={style}>
        <ButtonPromo>template</ButtonPromo>
    </div>
);
