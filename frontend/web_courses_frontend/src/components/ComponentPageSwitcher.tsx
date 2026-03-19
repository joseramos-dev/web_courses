import React, { useState } from "react"

interface ComponentPageSwitcherProps {
    labelName: string,
    icon?: React.ReactNode,
    component: React.ReactNode
}

export const ComponentPageSwitcher = (
    { components }: { components: ComponentPageSwitcherProps[] }
) => {

    const [activeTab, setActiveTab] = useState(0)

    return (
        <>
            <MenuSwitcher
                listNames={
                    components.map(c => ({ label: c.labelName, icon: c.icon }))
                }
                setActiveTab={setActiveTab}
                activeTab={activeTab} />
            <ContentSwitcher component={components[activeTab].component} />
        </>
    )
}

const ContentSwitcher = ({ component }: { component: React.ReactNode }) => {

    return (
        <>
            {component}
        </>
    )
}

const MenuSwitcher = (
    { listNames, setActiveTab, activeTab }:
        { listNames: { label: string, icon: React.ReactNode }[], setActiveTab: (tab: number) => void, activeTab: number }
) => {

    return (
        <div className="w-full">
            <ul className="flex flex-row w-full">
                {listNames.map((item, index) => (
                    <MenuSwitcherItem
                        key={index}
                        label={item.label}
                        isActive={activeTab === index}
                        icon={item.icon}
                        onClick={() => setActiveTab(index)}
                    />
                ))}
            </ul>
        </div>
    )
}
const MenuSwitcherItem = (
    { label, isActive, onClick, icon }:
        { label: string, isActive: boolean, onClick: () => void, icon?: React.ReactNode }
) => {
    return (
        <li className="flex-1 pb-4">
            <button className="w-full py-4 font-bold text-gray-400 hover:text-green-800 flex items-center justify-center gap-2" onClick={() => onClick()}>
                {icon}
                {
                    isActive ? <span className="text-bold text-green-800">{label}</span> : <span>{label}</span>
                }
            </button>
            {
                isActive ? <div className="w-full h-1 bg-green-800 mb-2" /> : <div className="w-full h-1 mb-2" />
            }
        </li>
    )
}