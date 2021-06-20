type Image = {
    theme: string, 
    image: {
        mobile: string,
        desktop: string,
    }
}

type Todo = {
    text: string,
    id: number,
    status: 'completed'|'active'
}

type Filter = {
    id: number,
    name: string,
    value: (todo: any) => any
}