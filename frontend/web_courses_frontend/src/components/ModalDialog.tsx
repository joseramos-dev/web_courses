import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { FaEdit } from "react-icons/fa";
import { AuthInput } from './ComponentAuthShared';
import DropDown from './DropDown';

const ModalDialog = (
    { label, value, setState, onSubmitBehavior, listOptions }:
        { label: string; value: string; setState: (stateValue: string) => void, onSubmitBehavior: (value: string) => void; listOptions?: string[] | null }
) => {
    const [inputValue, setInputValue] = useState(value);

    const closeModal = () => {
        setState("None");
    }
    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        closeModal()
        onSubmitBehavior(inputValue);
        // Handle form submission logic here
    }

    return (
        <div>
            <Dialog open={true} onClose={closeModal} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <form className="flex min-h-full items-center justify-center p-4 text-center sm:p-0" onSubmit={onSubmit}>
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-gray-800 text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                        >
                            {
                                listOptions ? (
                                    <ModalDropDownContent
                                        label={label}
                                        value={inputValue}
                                        onInputChange={setInputValue}
                                        closeModal={closeModal}
                                        listOptions={listOptions}
                                    />
                                ) : (
                                    <ModalEditContent
                                        label={label}
                                        value={inputValue}
                                        onInputChange={setInputValue}
                                        closeModal={closeModal}
                                    />
                                )
                            }

                        </DialogPanel>
                    </form>
                </div>
            </Dialog>
        </div>
    )
}

const ModalEditContent = (
    { label, value, onInputChange, closeModal }:
        { label: string; value: string; onInputChange: (value: string) => void; closeModal: () => void }
) => {
    return (
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-gray-500/10 sm:mx-0 sm:size-10">
                    <FaEdit aria-hidden="true" className="size-6 text-gray-800" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle as="h3" className="text-base font-semibold text-gray-800">
                        {`Edit ${label}`}
                    </DialogTitle>
                    <div className="mt-2">
                        <AuthInput text={value} onInputChange={e => onInputChange(e)} />
                    </div>
                </div>
            </div>

            <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                    type="submit"
                    data-autofocus
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-800 sm:ml-3 sm:w-auto"
                >
                    Edit {label}
                </button>
                <button
                    type="button"
                    onClick={() => closeModal()}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-gray-500 sm:mt-0 sm:w-auto"
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

const ModalDropDownContent = (
    { label, value, onInputChange, closeModal, listOptions }:
        { label: string; value: string; onInputChange: (value: string) => void; closeModal: () => void; listOptions: string[] }
) => {
    return (
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-gray-500/10 sm:mx-0 sm:size-10">
                    <FaEdit aria-hidden="true" className="size-6 text-gray-800" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle as="h3" className="text-base font-semibold text-gray-800">
                        {`Edit ${label}`}
                    </DialogTitle>
                    <div className="mt-2">
                        <DropDown
                            currentElement={value}
                            listElements={listOptions}
                            onSelect={e => onInputChange(e)}
                        />
                    </div>
                </div>
            </div>

            <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                    type="submit"
                    data-autofocus
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-800 sm:ml-3 sm:w-auto"
                >
                    Edit {label}
                </button>
                <button
                    type="button"
                    onClick={() => closeModal()}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-gray-400 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-gray-500 sm:mt-0 sm:w-auto"
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default ModalDialog;