package com.vkr.tms.controllers;

import com.vkr.tms.model.*;
import com.vkr.tms.payload.*;
import com.vkr.tms.repositories.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProjectsController {
    ProjectRepository projectRepository;
    TaskRepository taskRepository;
    PriorityRepository priorityRepository;
    UserRepository userRepository;
    RoleMemberRepository roleMemberRepository;
    TaskTypeRepository taskTypeRepository;
    TaskTypeSchemaRepository taskTypeSchemaRepository;
    Type_SchemaRepository type_schemaRepository;
    Status_SchemaRepository status_schemaRepository;
    StatusRepository statusRepository;

    public ProjectsController(ProjectRepository projectRepository, TaskRepository taskRepository, PriorityRepository priorityRepository,
                              UserRepository userRepository, RoleMemberRepository roleMemberRepository, TaskTypeRepository taskTypeRepository,
                                      TaskTypeSchemaRepository taskTypeSchemaRepository,
                                      Type_SchemaRepository type_schemaRepository, Status_SchemaRepository status_schemaRepository,
                              StatusRepository statusRepository){
        this.projectRepository = projectRepository;
        this.taskRepository = taskRepository;
        this.priorityRepository = priorityRepository;
        this.userRepository = userRepository;
        this.roleMemberRepository = roleMemberRepository;
        this.taskTypeRepository = taskTypeRepository;
        this.taskTypeSchemaRepository = taskTypeSchemaRepository;
        this.type_schemaRepository = type_schemaRepository;
        this.status_schemaRepository = status_schemaRepository;
        this.statusRepository = statusRepository;
    }

    @GetMapping(value="/all")
    public ResponseEntity<List<Project>> getAllProjects(){
        List<Project> projects = projectRepository.findAll();
        if (projects == null) {
            return ResponseEntity.notFound().build();
        } else {
            return new ResponseEntity<>(projects, HttpStatus.OK);
        }
    }

    @GetMapping(value="/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable(name="id") int id)
    {
        return new ResponseEntity<>(projectRepository.findById(id).get(), HttpStatus.OK);
    }

    @PostMapping(value = "/save", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Project> saveProject(@RequestBody Project project){
        Project projectSaved = projectRepository.save(project);
        if (projectSaved == null){
            return ResponseEntity.status(422).build();
        }
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .buildAndExpand(projectSaved.getId())
                .toUri();
        return ResponseEntity.created(uri)
                .body(projectSaved);
    }

    @GetMapping(value="getByUser/{id}")
    public ResponseEntity<List<Project>> getProjectsByUser(@PathVariable(name="id") int userId){
        Usr user = userRepository.getById(userId);
        List<Project> projects = roleMemberRepository.findByUser(user).stream()
                .map(RoleMember::getProject)
                .collect(Collectors.toList());

        projects.addAll(projectRepository.findByLead(user));
        return new ResponseEntity<>(projects, HttpStatus.OK);

    }

    @GetMapping(value="projectDetails/{id}")
    public ResponseEntity<ProjectDetails> getProjectDetails(@PathVariable(name="id") int id){
        Project project = projectRepository.findById(id).get();

        List<Usr> participants = roleMemberRepository.findByProject(project).stream()
                .map(RoleMember::getUser).collect(Collectors.toList());

        List<Task> tasks = taskRepository.getAllByProject(project);

        List<Priority> priorities = getAllPriorities().getBody();

        TaskTypeSchema taskTypeSchema = project.getTaskTypeSchema();
        TaskTypeSchemaBean ttbean = new TaskTypeSchemaBean(taskTypeSchema.getId(), taskTypeSchema.getName(),
                type_schemaRepository.getAllByTaskTypeSchema(taskTypeSchema).stream().map(Type_Schema::getTaskType).collect(Collectors.toList()));

        WorkflowSchema workflowSchema = project.getWorkflowSchema();
        WorkflowSchemaBean wBean = new WorkflowSchemaBean(workflowSchema.getId(), workflowSchema.getName(),
                status_schemaRepository.getAllByWorkflowSchema(workflowSchema).stream()
                        .map(y -> new StatusBean(y.getStatus(), y.getOrdering()))
                        .collect(Collectors.toList()));

        return new ResponseEntity<>(new ProjectDetails(project.getId(), project.getName(), project.getLead(), participants, tasks, priorities, ttbean, wBean), HttpStatus.OK);

    }

    @PostMapping(value="participants/add")
    public ResponseEntity<RoleMember> saveParticipant(@RequestBody RoleMemberBean participant){
        System.out.println("projectId=" + participant.getProjectId() + " userId = " + participant.getUserId());
        Project project = projectRepository.findById(participant.getProjectId()).get();
        Usr user = userRepository.findById(participant.getUserId()).get();
        RoleMember roleMember = new RoleMember();
        roleMember.setUser(user);
        roleMember.setProject(project);
        RoleMember savedParticipant = roleMemberRepository.save(roleMember);

        return new ResponseEntity<>(savedParticipant, HttpStatus.OK);
    }

    @GetMapping(value="participants/delete")
    public ResponseEntity<List<RoleMember>> deleteParticipant(@RequestParam(name="userId") int userId, @RequestParam(name="projectId") int projectId){
        Project project = projectRepository.findById(projectId).get();
        Usr user = userRepository.findById(userId).get();
        List <RoleMember> roleMembers = roleMemberRepository.findByUserAndProject(user, project);
        roleMemberRepository.deleteAll(roleMembers);
        return new ResponseEntity<>(roleMemberRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping(value="getUsersNotInProject/{id}")
    public ResponseEntity<List<Usr>> getUsersNotInProject(@PathVariable(name="id") int id){
        Project project = projectRepository.findById(id).get();
        List<Integer> participants = roleMemberRepository.findByProject(project).stream()
                .map(x -> x.getUser().getId())
                .collect(Collectors.toList());
        List<Usr> resUsers = userRepository.findAll().stream()
                .filter(x -> !participants.contains(x.getId()) && project.getLead().getId() != x.getId())
                .collect(Collectors.toList());
        return new ResponseEntity<>(resUsers, HttpStatus.OK);
    }

    @GetMapping(value="delete/{id}")
    public ResponseEntity<List<Project>> deleteProject(@PathVariable(name="id") int id){
        Optional<Project> projectOptional = projectRepository.findById(id);
        if (projectOptional.isEmpty())
        {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        Project project = projectOptional.get();

        roleMemberRepository.deleteAll(roleMemberRepository.findByProject(project));
        projectRepository.delete(project);

        return getAllProjects();
    }

    @GetMapping(value="task/{id}")
    public ResponseEntity<Task> getTask(@PathVariable(name="id") int id){
        return new ResponseEntity<>(taskRepository.findById(id).get(), HttpStatus.OK);
    }

    @GetMapping(value="{id}/tasks")
    public ResponseEntity<List<KanbanBean>> getAllTasksByProject(@PathVariable(name="id") int projectId){
        Project project = projectRepository.findById(projectId).get();
        List<Task> tasks = new ArrayList<>(taskRepository.getAllByProject(project));
        List<KanbanBean> beans = new ArrayList<>();
        beans.add(new KanbanBean("Непринятые", tasks.stream().filter(x -> !x.isChecked()).collect(Collectors.toList())));
        beans.get(0).getTasks().forEach(x -> System.out.println(x.getName()));
        List<Status> statuses = status_schemaRepository.getAllByWorkflowSchema(project.getWorkflowSchema()).stream().map(Status_Schema::getStatus).collect(Collectors.toList());
        for (Status status : statuses){
            beans.add(new KanbanBean(status.getName(), tasks.stream().filter(x -> x.isChecked() && x.getStatus().getId().equals(status.getId())).collect(Collectors.toList())));
        }

        return new ResponseEntity<>(beans, HttpStatus.OK);
    }

    @GetMapping(value="/tasks/remove/{id}")
    public ResponseEntity<List<Task>> removeTask(@PathVariable(name="id") int id){
        taskRepository.delete(taskRepository.findById(id).get());
        return new ResponseEntity<>(taskRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping(value="/mytasks/{id}")
    public ResponseEntity<List<KanbanBean>> getMyTasks(@PathVariable(name="id") int userId){
        Usr user = userRepository.getById(userId);
        List<Task> tasks = new ArrayList<>(taskRepository.getAllByAssignee(user));
        List<KanbanBean> beans = new ArrayList<>();
        beans.add(new KanbanBean("Непринятые", tasks.stream().filter(x -> !x.isChecked()).collect(Collectors.toList())));

        return new ResponseEntity<>(beans, HttpStatus.OK);
    }

    @GetMapping(value="priorities")
    public ResponseEntity<List<Priority>> getAllPriorities(){
        return new ResponseEntity<>(priorityRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping(value="saveTask")
    public ResponseEntity<Task> saveTask(@RequestBody Task task){
        Task savedTask = taskRepository.save(task);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .buildAndExpand(savedTask.getId())
                .toUri();
        return ResponseEntity.created(uri)
                .body(savedTask);
    }

    @GetMapping(value="checkTask/{id}")
    public ResponseEntity<Task> checkTask(@PathVariable(name="id") int id){
        Task task = taskRepository.findById(id).get();
        task.setChecked(true);
        Task savedTask = taskRepository.save(task);
        return new ResponseEntity<>(savedTask, HttpStatus.OK);
    }

    @GetMapping(value="moveTask/{id}")
    public ResponseEntity<Task> moveTask(@PathVariable(name="id") int id){
        Task task = taskRepository.findById(id).get();
        Project project = task.getProject();
        WorkflowSchema workflowSchema = project.getWorkflowSchema();
        List<Status_Schema> status_schemas = status_schemaRepository.getAllByWorkflowSchema(workflowSchema);
        int o = 0;

        for (Status_Schema status_schema : status_schemas){
            if (status_schema.getStatus().getId() == task.getStatus().getId()){
                o = status_schema.getOrdering();
                break;
            }
        }
        final int t = o + 1;
        Status targetStatus = status_schemas.stream().filter(x -> x.getOrdering() == t).collect(Collectors.toList()).get(0).getStatus();
        task.setStatus(targetStatus);
        Task savedTask = taskRepository.save(task);
        return new ResponseEntity<>(savedTask, HttpStatus.OK);
    }

    @PostMapping(value="saveSupportTask")
    public ResponseEntity<Task> saveSupportTask(@RequestBody Task task){
        Project supportProject = projectRepository.findById(1).get();
        TaskType type = type_schemaRepository.getAllByTaskTypeSchema(supportProject.getTaskTypeSchema()).get(0).getTaskType();
        Status status = status_schemaRepository.getAllByWorkflowSchema(supportProject.getWorkflowSchema()).stream().filter(x -> x.getOrdering() == 0).findFirst().get().getStatus();
        task.setPriority(priorityRepository.getByName("Высокий"));
        task.setChecked(true);
        task.setStatus(status);
        task.setProject(supportProject);
        task.setType(type);
        task.setAssignee(supportProject.getLead());
        return saveTask(task);
    }
}
