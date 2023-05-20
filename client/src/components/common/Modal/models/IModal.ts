export interface IModal {
    children: React.ReactNode;
    visible: boolean;
    callback: () => void;
}
