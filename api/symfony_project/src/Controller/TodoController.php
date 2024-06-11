<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\TodoRepository;
use App\Entity\Todo;
use App\OptionsResolver\TodoOptionsResolver;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route("/api", "api_")]
class TodoController extends AbstractController
{
    #[Route("/todos", "create_todo", methods: ["POST"])]
    public function createTodo(Request $request, TodoRepository $todoRepository, EntityManagerInterface $entityManager, ValidatorInterface $validator, TodoOptionsResolver $todoOptionsResolver): JsonResponse
    {
        try
        {   
            $requestBody = json_decode($request->getContent(), true);
            // $fields = $todoOptionsResolver->configureTask(true)->resolve($requestBody);
                    // Log the request body to check its content
            error_log(print_r($requestBody, true));


            //Här skapar vi vårat nya objekt(Task)
            $todo = new Todo();
            $todo->setTitle($requestBody["title"]);
            $description = $requestBody['description'] ?? null;
            $todo->setDescription($description);
            
            // // Validerar våran entitet
            // $errors = $validator->validate($todo);
            // if (count($errors) > 0) { //count räknar errors och fångar den, finns det så skickar den BadRequest
            // throw new BadRequestHttpException((string) $errors);
            // }

            $entityManager->persist($todo);
            $entityManager->flush(); // Här sparar vi vårat object till databasen

            return $this->json([
                'message' => 'Task created successfully',
                'todo' => $todo
            ], JsonResponse::HTTP_CREATED);
        }
        catch(exception $e)
        {
            throw new BadRequestHttpException($e->getMessage());
        }
    }

    #[Route('/todos', name: 'tasks', methods: ["GET"])]
    public function index(TodoRepository $todoRepository): JsonResponse
    {
        $tasks = $todoRepository->findAll();
        return $this->json($tasks);
    }

    #[Route("/todos/{id}", "get_task", methods: ["GET"])]
    public function getTask(Todo $task): JsonResponse
    {
        return $this->json($task);
    }

    #[Route("/todos/{id}", "update_task", methods: ["PATCH", "PUT"])]
    public function updateTodo(Todo $todo, Request $request, TodoOptionsResolver $todoOptionsResolver, ValidatorInterface $validator, EntityManagerInterface $entityManager)
    {
        try {
            $requestBody = json_decode($request->getContent(), true);
            $isPutMethod = $request->getMethod() === "PUT";
            error_log('Request Method: ' . $request->getMethod()); // Log the request method
            error_log('Request Body: ' . print_r($requestBody, true)); // Log the received data
            error_log(print_r($requestBody, true));
    
            $fields = $todoOptionsResolver
                ->configureTask($isPutMethod)
                ->configureDescription($isPutMethod)
                ->configureCompleted($isPutMethod)
                ->resolve($requestBody);
    
                foreach($fields as $field => $value) 
                {
                    switch($field) {
                        case "title":
                            $todo->setTitle($value);
                            break;
                        case "description":
                            $todo->setDescription($value);
                            break;
                        case "completed":
                            $todo->setCompleted($value);
                            break;
                    }
                }

                $errors = $validator->validate($todo);
                if (count($errors) > 0) {
                    throw new InvalidArgumentException((string) $errors);
                }
        
                $entityManager->flush();

                return $this->json([
                    'message' => 'Task successfully updated!',
                    'todo' => $todo
                ], JsonResponse::HTTP_CREATED);
                
            } catch (\Exception $e) {
                error_log('Exception: ' . $e->getMessage()); // Log any exception message
                return $this->json([
                    'message' => 'There was an error updating the task!',
                    'error' => $e->getMessage()
                ], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
            }
    }



    

    #[Route("/todos/{id}", "delete_task", methods: ["DELETE"])]
    public function deleteTask(Todo $todo, EntityManagerInterface $entityManager)
    {
        if(!$todo){
            return $this->json(['error' => 'Task not found'], Response::HTTP_NOT_FOUND);
        }

        $entityManager->remove($todo);  
        $entityManager->flush();       

        return $this->json(null, Response::HTTP_NO_CONTENT);
    }


}
