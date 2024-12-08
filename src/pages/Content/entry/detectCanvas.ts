import { createSidebar } from './runInCanvas';
import { createAssignmentSidebar } from './runInCanvasAssignments';

export const isCanvas = document
  .getElementById('application')
  ?.classList.contains('ic-app');

/* Load sidebar immediately or wait until page fully loads. */
function createSidebarWhenCanvasReady() {
  /* This is the <aside> element contains the existing canvas sidebar. */
  const rightSide = document.getElementById('right-side');
  const path = window.location.pathname.split('/');
  const onCoursePage = path.length >= 2 && path[path.length - 2] === 'courses';

  if (rightSide) {
    // We can't insert directly in the right side element because of certain other extensions...
    // This might make it appear above the logo though, need someone to test that
    const observer = new MutationObserver(() => {
      const todoListContainers = rightSide?.getElementsByClassName(
        'Sidebar__TodoListContainer'
      );
      const teacherTodoListContainers =
        rightSide?.getElementsByClassName('todo-list-header');
      const comingUpContainers = rightSide?.getElementsByClassName('coming_up');
      if (
        onCoursePage ||
        todoListContainers?.length > 0 ||
        teacherTodoListContainers?.length > 0 ||
        comingUpContainers?.length > 0
      )
        createSidebar(rightSide);
    });

    /*
    in case the element is already loaded and not caught by mutation observer
    */
    const containerList = document.getElementsByClassName(
      'Sidebar__TodoListContainer'
    );
    const comingUpList = rightSide?.getElementsByClassName('coming_up');
    const teacherContainerList =
      document.getElementsByClassName('todo-list-header');

    if (
      onCoursePage ||
      containerList?.length > 0 ||
      teacherContainerList?.length > 0 ||
      comingUpList?.length > 0
    ) {
      createSidebar(rightSide);
    } else if (rightSide) {
      observer.observe(rightSide as Node, {
        childList: true,
      });
    }
  }
}

// only on assignments page
function createSidebarWhenAssignments() {
  const path = window.location.pathname.split('/');
  const onAssignmentsPage =
    path.length == 5 &&
    (path[3] === 'assignments' ||
      path[3] === 'quizzes' ||
      path[3] === 'discussion_topics');

  const rightSideWrapper = document.getElementById('right-side-wrapper');
  const rightSide = document.getElementById('right-side');

  if (
    onAssignmentsPage &&
    rightSide &&
    rightSideWrapper?.style.display === ''
  ) {
    rightSideWrapper.style.display = 'block';
    /* Fix sidebar while scrolling vertically */
    rightSideWrapper.style.position = 'sticky';
    rightSideWrapper.style.top = '0px';
    rightSideWrapper.style.overflowY = 'scroll';
    rightSideWrapper.style.height = '100vh';
    rightSideWrapper.classList.add('tfc-robot-wrapper');
    createAssignmentSidebar(rightSide);
    return true;
  }
}

export function CanvasEntryPoint(): void {
  createSidebarWhenCanvasReady();
  // createSidebarWhenListview();
  createSidebarWhenAssignments();
}
