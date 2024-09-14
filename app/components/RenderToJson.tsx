/* eslint-disable @typescript-eslint/no-explicit-any */
import {NodeHandler, NodeHandlers, TipTapRender} from "@troop.com/tiptap-react-render";

const paragraph: NodeHandler = (props) => {
    return <p>{props.children}</p>
}

const doc: NodeHandler = (props) => {
    return <>{props.children}</>
}

const text: NodeHandler = (props) => {
    return <span>{props.node.text}</span>
}

const handlers: NodeHandlers = {
    doc: doc,
    text: text,
    paragraph: paragraph,
}

export function RenderToJson({data}: {data: any}){
    return (
        <div className="px-2 pt-2 prose">
            <TipTapRender handlers={handlers} node={data} />
        </div>
    )
}