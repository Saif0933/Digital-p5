import { Download, Edit, Plus, Search, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { downloadJobsCSV } from '../utils/downloadUtils';
import JobModal from './modals/JobModal';

const Jobs = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      project: 'E-commerce Website',
      projectId: 'PRJ001',
      description: 'Modern e-commerce platform with payment integration with full stack',
      projectValue: 250000,
      designers: 'Digital Solutions, Deep Test 1.2',
      frontend: 'React Developer',
      backend: 'Node.js Developer',
      createdOn: '2025-01-10',
      deadline: '2025-02-15',
      overdue: false,
      status: 'In Progress',
      awsDetails: 'EC2, S3, RDS configured',
      figmaFile: 'https://figma.com/design/ecommerce',
      holdReassign: false,
    },
    {
      id: 2,
      project: 'Mobile App Development',
      projectId: 'PRJ002',
      description: 'Cross-platform mobile application',
      projectValue: 180000,
      designers: 'Sagar Kumar',
      frontend: 'React Native Developer',
      backend: 'Python Developer',
      createdOn: '2025-01-05',
      deadline: '2025-01-20',
      overdue: true,
      status: 'Delayed',
      awsDetails: 'Lambda, API Gateway',
      figmaFile: 'https://figma.com/design/mobile-app',
      holdReassign: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const filteredJobs = jobs.filter(
    (job) =>
      job.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.projectId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddJob = (jobData) => {
    const newJob = {
      ...jobData,
      id: Math.max(...jobs.map((j) => j.id), 0) + 1,
    };
    setJobs([...jobs, newJob]);
  };

  const handleEditJob = (jobData) => {
    if (editingJob) {
      setJobs(
        jobs.map((j) =>
          j.id === editingJob.id ? { ...jobData, id: editingJob.id } : j
        )
      );
      setEditingJob(null);
    }
  };

  const handleDeleteJob = (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      setJobs(jobs.filter((j) => j.id !== id));
    }
  };

  const openEditModal = (job) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingJob(null);
  };

  const getStatusBadge = (status, overdue) => {
    if (overdue) return 'bg-red-100 text-red-800';

    const colors = {
      Completed: 'bg-green-100 text-green-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      Pending: 'bg-yellow-100 text-yellow-800',
      Delayed: 'bg-red-100 text-red-800',
      'On Hold': 'bg-gray-100 text-gray-800',
    };
    return `px-2 py-1 text-xs rounded-full ${
      colors[status] || 'bg-gray-100 text-gray-800'
    }`;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Jobs</h1>
          <p className="text-gray-600 mt-2">
            Manage project jobs and assignments
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => downloadJobsCSV(filteredJobs)}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Download className="w-5 h-5 mr-2" />
            Download CSV
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Job
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by project name or ID..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timeline
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Technical
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {job.project}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {job.projectId}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {job.description}
                      </div>
                      <div className="text-sm font-medium text-green-600">
                        ₹{job.projectValue.toLocaleString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-gray-900">
                        Design: {job.designers}
                      </div>
                      <div className="text-sm text-gray-900">
                        Frontend: {job.frontend}
                      </div>
                      <div className="text-sm text-gray-900">
                        Backend: {job.backend}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-gray-900">
                        Created: {job.createdOn}
                      </div>
                      <div className="text-sm text-gray-900">
                        Deadline: {job.deadline}
                      </div>
                      {job.overdue && (
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                          Overdue
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm text-gray-900">
                        AWS: {job.awsDetails}
                      </div>
                      <div className="text-sm text-blue-600 hover:underline cursor-pointer">
                        Figma File
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <span className={getStatusBadge(job.status, job.overdue)}>
                        {job.status}
                      </span>
                      {job.holdReassign && (
                        <div className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full mt-1">
                          Hold/Reassign
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(job)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <JobModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={editingJob ? handleEditJob : handleAddJob}
          initialData={editingJob}
        />
      )}
    </div>
  );
};

export default Jobs;
