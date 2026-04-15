
export function handleChangeFunction(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;

    console.log(name, value);
}