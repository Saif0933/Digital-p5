import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const ProjectModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    clientId: '',
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    date: '',
    estValue: 0,
    confirmationBy: 'Email',
    projectLead: '',
    sentToAccounting: false,
    billingStatus: 'Pending',
    gstFilingStatus: 'Pending',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        clientId: initialData.clientId,
        clientName: initialData.clientName,
        clientPhone: initialData.clientPhone,
        clientEmail: initialData.clientEmail,
        date: initialData.date,
        estValue: initialData.estValue,
        confirmationBy: initialData.confirmationBy,
        projectLead: initialData.projectLead,
        sentToAccounting: initialData.sentToAccounting,
        billingStatus: initialData.billingStatus,
        gstFilingStatus: initialData.gstFilingStatus,
      });
    } else {
      setFormData({
        clientId: '',
        clientName: '',
        clientPhone: '',
        clientEmail: '',
        date: '',
        estValue: 0,
        confirmationBy: 'Email',
        projectLead: '',
        sentToAccounting: false,
        billingStatus: 'Pending',
        gstFilingStatus: 'Pending',
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? checked :
        type === 'number' ? Number(value) :
        value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {initialData ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Client ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client ID
              </label>
              <input
                type="text"
                name="clientId"
                value={formData.clientId}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Client Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client Name
              </label>
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Client Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client Phone
              </label>
              <input
                type="tel"
                name="clientPhone"
                value={formData.clientPhone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Client Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client Email
              </label>
              <input
                type="email"
                name="clientEmail"
                value={formData.clientEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Estimated Value */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estimated Value (₹)
              </label>
              <input
                type="number"
                name="estValue"
                value={formData.estValue}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Confirmation By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmation By
              </label>
              <select
                name="confirmationBy"
                value={formData.confirmationBy}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Email">Email</option>
                <option value="Phone">Phone</option>
                <option value="Verbal">Verbal</option>
                <option value="PO">PO</option>
              </select>
            </div>

            {/* Project Lead */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Lead
              </label>
              <input
                type="text"
                name="projectLead"
                value={formData.projectLead}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Billing Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Billing Status
              </label>
              <select
                name="billingStatus"
                value={formData.billingStatus}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* GST Filing Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GST Filing Status
              </label>
              <select
                name="gstFilingStatus"
                value={formData.gstFilingStatus}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Pending">Pending</option>
                <option value="Filed">Filed</option>
                <option value="Not Required">Not Required</option>
              </select>
            </div>
          </div>

          {/* Sent to Accounting */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="sentToAccounting"
                checked={formData.sentToAccounting}
                onChange={handleChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Sent to Accounting</span>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {initialData ? 'Update Project' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
