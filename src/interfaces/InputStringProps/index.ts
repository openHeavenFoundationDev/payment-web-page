export interface InputStringProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  getStringValue: (value: string) => void;
}
