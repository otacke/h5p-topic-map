/* eslint-disable react/jsx-props-no-spreading */
import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Position } from "../../types/Position";

import { Arrow, ArrowProps} from "./Arrow";
import { TypeofTypeAnnotation } from "@babel/types";

export default{
    title: "Arrow",
    component: Arrow,
} as ComponentMeta<typeof Arrow>;

export const parameters = {
    controls: {
        matchers: {
            color: /(background|color)$/i,
        }
    },
};

const blue = "#114df3";
const red = "#df0c0c";

const defaultArgs: ArrowProps = {
    start: {
        x: 0, 
        y:0,    
    },
    end: {
        x: 40,
        y:0,
    },
    color: blue,
};

export const RightPointingArrow: ComponentStory<typeof Arrow> = () => {
    const args: ArrowProps = { 
        start: {
            x: 0, 
            y:0,    
        },
        end: {
            x: 40,
            y:0,
        },
        color: blue, 
    };
    return <Arrow {...args} />;
};

export const LeftPointingArrow: ComponentStory<typeof Arrow> = () => {
    const args: ArrowProps = {
        start: {
            x: 40,
            y: 0,
        },
        end: {
            x: 0,
            y: 0,
        },
        color: red,
    };
    return <Arrow {...args} />;
};
export const UpPointingArrow: ComponentStory<typeof Arrow> = () => {
    const args: ArrowProps = {
        start: {
            x: 0,
            y: 40,
        },
        end: {
            x: 0,
            y: 0,
        },
        color: red,
    };
    return <Arrow {...args} />;
};
export const DownPointingArrow: ComponentStory<typeof Arrow> = () => {
    const args: ArrowProps = {
        start: {
            x: 0,
            y: 0,
        },
        end: {
            x: 0,
            y: 40,
        },
        color: red,
    };
    return <Arrow {...args} />;
};