import { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    FlatList,
    View,
    TouchableOpacity
} from 'react-native';
import { dummyTasks } from '../src/data/dummyTasks';

export default function HomeScreen() {
    const [tasks, setTasks] = useState(dummyTasks);
    const [filter, setFilter] = useState('All');

    const handleToggle = (task) => {
        setTasks(prev =>
            prev.map(t =>
                t.id === task.id
                    ? { ...t, status: t.status === 'done' ? 'pending' : 'done' }
                    : t
            )
        );
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'All') return true;
        if (filter === 'Todo') return task.status === 'pending';
        if (filter === 'Done') return task.status === 'done';
    });
    
    const filterOptions = ['All', 'Todo', 'Done'];

    const categoryColors = {
        Mobile: '#3b82f6',
        RPL: '#16a34a',
        IoT: '#7c3aed',
        Default: '#64748b'
    };

    const renderTaskItem = ({ item }) => {
        const isDone = item.status === 'done';
        const categoryColor = categoryColors[item.category] || categoryColors.Default;

        return (
            <TouchableOpacity 
                onPress={() => handleToggle(item)} 
                style={[styles.taskItem, isDone && styles.taskItemDone]}
            >
                <View>
                    <View style={styles.badgesContainer}>
                        {/* Badge Kategori */}
                        <View style={[styles.badge, { backgroundColor: categoryColor }]}>
                            <Text style={styles.badgeText}>{item.category}</Text>
                        </View>

                        {/* Badge Status Todo/Done */}
                        <View style={[
                            styles.badge,
                            isDone ? styles.doneBadge : styles.todoBadge
                        ]}>
                            <Text style={styles.badgeText}>{isDone ? 'Done' : 'Todo'}</Text>
                        </View>
                    </View>

                    <Text style={[styles.taskTitle, isDone && styles.taskTitleDone]}>
                        {item.title}
                    </Text>
                    
                    {item.description && (
                        <Text style={[styles.taskDescription, isDone && styles.taskTitleDone]}>
                            {item.description}
                        </Text>
                    )}

                    {item.dueDate && (
                        <View style={styles.dueDateContainer}>
                            <Text style={styles.dueDateIcon}>🗓️</Text>
                            <Text style={[styles.dueDateText, isDone && styles.taskTitleDone]}>
                                {item.dueDate}
                            </Text>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>TaskMate – Daftar Tugas</Text>

            <View style={styles.filterContainer}>
                {filterOptions.map((option) => (
                    <TouchableOpacity
                        key={option}
                        style={[
                            styles.filterButton,
                            filter === option && styles.activeFilterButton
                        ]}
                        onPress={() => setFilter(option)}
                    >
                        <Text style={[
                            styles.filterText,
                            filter === option && styles.activeFilterText
                        ]}>
                            {option}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={filteredTasks}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingHorizontal: 16 }}
                renderItem={renderTaskItem}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc'
    },
    header: {
        fontSize: 20,
        fontWeight: '700',
        padding: 16
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    filterButton: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
        backgroundColor: '#e2e8f0',
    },
    activeFilterButton: {
        backgroundColor: '#3b82f6',
    },
    filterText: {
        fontWeight: '600',
        color: '#475569',
    },
    activeFilterText: {
        color: '#ffffff',
    },
    taskItem: {
        backgroundColor: '#ffffff',
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    taskItemDone: {
        backgroundColor: '#f1f5f9',
    },
    badgesContainer: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    badge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    badgeText: {
        color: '#ffffff',
        fontSize: 10,
        fontWeight: '700',
    },
    todoBadge: {
        backgroundColor: '#f97316', 
        marginLeft: 6,
    },
    doneBadge: {
        backgroundColor: '#6b7280', 
        marginLeft: 6,
    },
    taskTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1e293b',
    },
    taskTitleDone: {
        textDecorationLine: 'line-through',
        color: '#94a3b8',
    },
    taskDescription: {
        fontSize: 14,
        color: '#64748b',
        marginTop: 4,
    },
    dueDateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    dueDateIcon: {
        fontSize: 14,
    },
    dueDateText: {
        fontSize: 12,
        color: '#ef4444',
        fontWeight: '600',
        marginLeft: 6,
    },
});