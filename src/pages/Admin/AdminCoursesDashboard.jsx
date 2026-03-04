import React, { useEffect, useState } from 'react';
import { Plus, PlusCircle } from 'lucide-react';
import { INITIAL_COURSES } from '../../components/admin/constants';
import CourseFilterBar from '../../components/admin/courses/CourseFilterBar';
import AdminCourseCard from '../../components/admin/courses/AdminCourseCard';
import CourseStatsFooter from '../../components/admin/courses/CourseStatsFooter';
import CreateCourseModal from '../../components/admin/courses/CreateCourseModal';
import ConfirmActionModal from '../../components/admin/courses/ConfirmActionModal';
import { courseService } from '../../services/courseService';
import toast from 'react-hot-toast';

const AdminCoursesDashboard = () => {
    const [courses, setCourses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newCourse, setNewCourse] = useState({ title: '', level: 'BEGINNER', iconName: 'GraduationCap' });
    const [openMenuId, setOpenMenuId] = useState(null);

    const [confirmModal, setConfirmModal] = useState({
        isOpen: false, actionType: null, courseId: null, title: '', message: '', confirmText: '', isDestructive: false
    });

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setIsLoading(true);
                const data = await courseService.getAllCourses();
                setCourses(data);
            } catch (error) {
                console.error("Lỗi khi tải danh sách khóa học:", error);
                toast.error("Failed to load courses. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        }
        fetchCourses();
    }, []);

    // Xử lý tạo mới
    const handleCreateCourse = async (e) => {
        e.preventDefault();
        if (!newCourse.title.trim()) return;

        const payload = {
            title: newCourse.title,
            level: newCourse.level,
            iconName: newCourse.iconName,
            status: 'DRAFT'
        }

        try {
            setIsSubmitting(true);
            const createdCourse = await courseService.createCourse(payload);
            setCourses([createdCourse, ...courses]);

            setIsModalOpen(false);
            setNewCourse({ title: '', level: 'Beginner', iconName: 'GraduationCap' });
        } catch (error) {
            console.error("Lỗi khi tạo khóa học:", error);
            toast.error("Failed to create course. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Kích hoạt Modal Xác nhận
    const triggerToggleStatus = (course) => {
        const isPublished = course.status === 'PUBLISHED';
        setConfirmModal({
            isOpen: true, actionType: 'TOGGLE_STATUS', courseId: course.courseId,
            title: isPublished ? 'Move to Draft' : 'Publish Course',
            message: isPublished ? `Are you sure you want to hide "${course.title}"? Students won't see it.` : `Are you sure you want to publish "${course.title}"?`,
            confirmText: isPublished ? 'Move to Draft' : 'Publish Course', isDestructive: false
        });
        setOpenMenuId(null);
    };

    const triggerDelete = (course) => {
        setConfirmModal({
            isOpen: true, actionType: 'DELETE', courseId: course.courseId,
            title: 'Delete Course', message: `Are you sure you want to permanently delete "${course.title}"?`,
            confirmText: 'Delete Course', isDestructive: true
        });
        setOpenMenuId(null);
    };

    // Xác nhận thực thi
    const handleConfirmAction = async () => {
        if (confirmModal.actionType === 'TOGGLE_STATUS') {
            try {
                const updatedCourse = await courseService.updateStatus(confirmModal.courseId);
                setCourses(courses.map(c => c.courseId === confirmModal.courseId ? updatedCourse : c));
            } catch (error) {
                console.error("Lỗi khi cập nhật trạng thái khóa học:", error);
                toast.error("Failed to update course status. Please try again later.");
            }
        } else if (confirmModal.actionType === 'DELETE') {
            setCourses(courses.filter(c => c.courseId !== confirmModal.courseId));
        }
        setConfirmModal({ ...confirmModal, isOpen: false });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center mt-30">
                <div className="loader"></div>
            </div>
        );
    }
    return (
        <div className="font-display text-[#1b190d] dark:text-[#f0ede4] min-h-screen flex relative">

            <main className="w-full">
                <header className="flex flex-col md:flex-row md:items-center justify-between mb-5 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Course Management</h1>
                        <p className="text-[#1b190d]/60 dark:text-[#f0ede4]/60 mt-1 font-medium">Manage and organize your {courses.length} active courses.</p>
                    </div>
                    <button onClick={() => setIsModalOpen(true)} className="bg-[#eac82e] hover:bg-[#eac82e]/90 text-[#211e11] font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-[#eac82e]/20 active:scale-95 w-fit">
                        <Plus className="w-5 h-5" /> Create New Course
                    </button>
                </header>

                <CourseFilterBar />

                {openMenuId && <div className="fixed inset-0 z-40" onClick={() => setOpenMenuId(null)}></div>}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {courses.map((course) => (
                        <AdminCourseCard
                            key={course.courseId}
                            course={course}
                            isMenuOpen={openMenuId === course.courseId}
                            onToggleMenu={() => setOpenMenuId(openMenuId === course.courseId ? null : course.courseId)}
                            onToggleStatus={() => triggerToggleStatus(course)}
                            onDelete={() => triggerDelete(course)}
                        />
                    ))}

                    {/* Nút thẻ Add Another */}
                    <div onClick={() => setIsModalOpen(true)} className="group bg-[#ffffff]/50 dark:bg-[#2d2916]/50 rounded-xl border-2 border-dashed border-[#eac82e]/20 flex flex-col items-center justify-center p-8 hover:border-[#eac82e] transition-all cursor-pointer min-h-[350px]">
                        <div className="w-16 h-16 bg-[#eac82e]/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <PlusCircle className="text-[#eac82e] w-8 h-8" />
                        </div>
                        <h3 className="font-bold text-lg">Add Another Course</h3>
                        <p className="text-[#1b190d]/50 dark:text-[#f0ede4]/50 text-sm text-center mt-2 px-4">Start drafting a new curriculum for your hive members today.</p>
                    </div>
                </div>

                <CourseStatsFooter totalCourses={courses.length} />
            </main>

            <CreateCourseModal
                isOpen={isModalOpen} isSubmitting={isSubmitting} onClose={() => setIsModalOpen(false)}
                newCourse={newCourse} setNewCourse={setNewCourse} onSubmit={handleCreateCourse}
            />

            <ConfirmActionModal
                {...confirmModal}
                onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
                onConfirm={handleConfirmAction}
            />
        </div>
    );
};

export default AdminCoursesDashboard;