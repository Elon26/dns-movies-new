import Modal from "./Modal";

export default {
    title: "Modal",
    component: Modal
};

export const Default = () => {
    return (
        <Modal callback={() => console.log("")} visible={true}>
        </Modal>
    );
};
