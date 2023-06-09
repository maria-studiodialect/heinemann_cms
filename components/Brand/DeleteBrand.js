import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import {AiFillDelete} from 'react-icons/ai'

import Button from '../common/Button'

const DeleteBrand = ({ brandId, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleClose = () => setIsOpen(false)
  const handleOpen = () => setIsOpen(true)
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      const response = await fetch('/api/brands/deleteBrand', {
        method: 'POST',
        body: JSON.stringify({ id: brandId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Product deleted successfully, handle any necessary updates
        console.log('Brand deleted');
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error deleting brand:', error);
      // Handle error case, show error message to the user, etc.
    } finally {
      setDeleting(false);
      window.location.replace('/brands');
    }
  };

  return (
    <>
      <div onClick={handleOpen} className='text-sm bg-gray-200 px-2 rounded-full'>
        Delete
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="z-100 fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="mb-5 text-lg font-semibold leading-6 text-gray-800"
                  >
                    Delete Brand
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Do you really want to delete the brand?
                    </p>
                  </div>

                  <div className="mt-4 flex w-full items-center space-x-4">
                    <Button
                      className="flex-1"
                      variant="text"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                    <Button className="flex-1" onClick={handleDelete}>
                      Delete
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default DeleteBrand
