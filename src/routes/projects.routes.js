import express from "express";

/**PrismaORM -> 3계층 의존성 주입 */
import { prisma } from "../models/index.js";
import { ProjectsRepository } from "../repositories/projects.repository.js";
import { ProjectsService } from "../services/projects.service.js";
import { ProjectsController } from "../controllers/projects.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const router = express.Router();

/**인스턴스 생성 */
const projectsRepository = new ProjectsRepository(prisma);
const projectsService = new ProjectsService(projectsRepository);
const projectsController = new ProjectsController(projectsService);

// 프로젝트 생성, 조회, 수정, 삭제
router.get("/", authMiddleware, projectsController.getAllProjects);
router.get(
  "/:projectId",
  authMiddleware,
  projectsController.getProjectByProjectId,
);
router.post("/", authMiddleware, projectsController.createProject);
router.put("/:projectId", authMiddleware, projectsController.updateProject);
router.delete("/:projectId", authMiddleware, projectsController.deleteProject);

export default router;
