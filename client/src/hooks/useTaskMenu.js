
export const useTaskMenu = function(onClickTasksOptionSelectionHandler, onClickDateSelectionHandler, dateSelection, setSortMethod){
    const onClickAllTasks = () =>{
        onClickTasksOptionSelectionHandler(0);
        setSortMethod('all tasks');
    }
    const onClickDateTasks = () => {
        onClickTasksOptionSelectionHandler(1);
        dateSelection === 0 ? setSortMethod('today'):
            dateSelection === 1 ? setSortMethod('week'):
                setSortMethod('future');
    }
    const onClickResponsiblityExecutor = () => {
        onClickTasksOptionSelectionHandler(2);
        setSortMethod('executor');
    }
    const onClickToday = () => {
        onClickDateSelectionHandler(0);
        setSortMethod('today');
    }
    const onClickWeek = () => {
        onClickDateSelectionHandler(1);
        setSortMethod('week');
    }

    const onClickFuture = () => {
        onClickDateSelectionHandler(2);
        setSortMethod('future');
    }

    return {onClickAllTasks, onClickDateTasks, onClickResponsiblityExecutor, onClickToday, onClickWeek, onClickFuture};
};
