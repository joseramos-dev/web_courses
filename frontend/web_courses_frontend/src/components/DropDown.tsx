import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { FaChevronDown } from 'react-icons/fa'


export default function DropDown(
    { currentElement, listElements, onSelect }:
        { currentElement: string, listElements: string[], onSelect: (item: string) => void }
) {
    return (
        <Menu as="div" className="relative inline-block">
            <MenuButton className="inline-flex w-full justify-between items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 min-w-[150px]">
                <span>{currentElement}</span>
                <FaChevronDown aria-hidden="true" className="-mr-1 size-5 text-gray-500" />
            </MenuButton>

            <MenuItems
                transition
                anchor="bottom start"
                className="z-50 mt-1 w-56 origin-top-right rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in py-1"
            >
                {listElements.map((item) => (
                    <MenuItem key={item}>
                        <button
                            onClick={() => onSelect(item)}
                            className="block w-full px-4 py-2 text-left text-sm text-gray-800 data-focus:bg-gray-100 data-focus:outline-none"
                        >
                            {item}
                        </button>
                    </MenuItem>
                ))}
            </MenuItems>
        </Menu>
    )
}