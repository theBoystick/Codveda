from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib import messages
from django.http import JsonResponse
from .models import Task, UserProfile
import json

# Public Views
def home(request):
    """Home page with overview"""
    context = {
        'featured_features': [
            {
                'title': '📋 Gestion de Tâches',
                'description': 'Organisez vos tâches avec priorités et dates limites'
            },
            {
                'title': '🔐 Sécurité',
                'description': 'Authentification sécurisée avec réinitialisation de mot de passe'
            },
            {
                'title': '📊 Statistiques',
                'description': 'Suivez votre productivité et vos progrès'
            },
        ]
    }
    return render(request, 'home.html', context)

# Authentication Views
def register(request):
    """User registration"""
    if request.user.is_authenticated:
        return redirect('dashboard')
    
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        password_confirm = request.POST.get('password_confirm')
        
        # Validation
        if not all([username, email, password, password_confirm]):
            messages.error(request, 'Tous les champs sont requis')
            return redirect('register')
        
        if password != password_confirm:
            messages.error(request, 'Les mots de passe ne correspondent pas')
            return redirect('register')
        
        if len(password) < 8:
            messages.error(request, 'Le mot de passe doit contenir au moins 8 caractères')
            return redirect('register')
        
        if User.objects.filter(username=username).exists():
            messages.error(request, 'Cet utilisateur existe déjà')
            return redirect('register')
        
        # Create user
        user = User.objects.create_user(username=username, email=email, password=password)
        UserProfile.objects.create(user=user)
        messages.success(request, 'Inscription réussie! Connectez-vous maintenant.')
        return redirect('login')
    
    return render(request, 'register.html')

def login_view(request):
    """User login"""
    if request.user.is_authenticated:
        return redirect('dashboard')
    
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            messages.success(request, f'Bienvenue {user.username}!')
            return redirect('dashboard')
        else:
            messages.error(request, 'Identifiants invalides')
            return redirect('login')
    
    return render(request, 'login.html')

# Dashboard Views
@login_required
def dashboard(request):
    """User dashboard with statistics"""
    user = request.user
    tasks = Task.objects.filter(user=user)
    
    context = {
        'total_tasks': tasks.count(),
        'completed_tasks': tasks.filter(status='completed').count(),
        'in_progress_tasks': tasks.filter(status='in_progress').count(),
        'todo_tasks': tasks.filter(status='todo').count(),
        'high_priority_tasks': tasks.filter(priority='high', status='completed').count(),
        'recent_tasks': tasks[:5],
    }
    return render(request, 'dashboard.html', context)

# Task Views
@login_required
def task_list(request):
    """List all user tasks with filtering"""
    user = request.user
    tasks = Task.objects.filter(user=user)
    
    # Filter by status
    status = request.GET.get('status')
    if status:
        tasks = tasks.filter(status=status)
    
    # Filter by priority
    priority = request.GET.get('priority')
    if priority:
        tasks = tasks.filter(priority=priority)
    
    # Search
    search = request.GET.get('search')
    if search:
        tasks = tasks.filter(title__icontains=search) | tasks.filter(description__icontains=search)
    
    context = {
        'tasks': tasks,
        'status_choices': Task.STATUS_CHOICES,
        'priority_choices': Task.PRIORITY_CHOICES,
    }
    return render(request, 'task_list.html', context)

@login_required
def task_create(request):
    """Create a new task"""
    if request.method == 'POST':
        title = request.POST.get('title')
        description = request.POST.get('description')
        priority = request.POST.get('priority')
        due_date = request.POST.get('due_date') or None
        
        if not title:
            messages.error(request, 'Le titre est requis')
            return redirect('task_create')
        
        Task.objects.create(
            user=request.user,
            title=title,
            description=description,
            priority=priority,
            due_date=due_date
        )
        messages.success(request, 'Tâche créée avec succès!')
        return redirect('task_list')
    
    context = {
        'priority_choices': Task.PRIORITY_CHOICES,
    }
    return render(request, 'task_form.html', context)

@login_required
def task_update(request, pk):
    """Update a task"""
    task = get_object_or_404(Task, pk=pk, user=request.user)
    
    if request.method == 'POST':
        task.title = request.POST.get('title', task.title)
        task.description = request.POST.get('description', task.description)
        task.priority = request.POST.get('priority', task.priority)
        task.status = request.POST.get('status', task.status)
        task.due_date = request.POST.get('due_date') or None
        task.save()
        messages.success(request, 'Tâche mise à jour!')
        return redirect('task_list')
    
    context = {
        'task': task,
        'status_choices': Task.STATUS_CHOICES,
        'priority_choices': Task.PRIORITY_CHOICES,
        'is_update': True,
    }
    return render(request, 'task_form.html', context)

@login_required
def task_delete(request, pk):
    """Delete a task"""
    task = get_object_or_404(Task, pk=pk, user=request.user)
    
    if request.method == 'POST':
        task.delete()
        messages.success(request, 'Tâche supprimée!')
        return redirect('task_list')
    
    context = {'task': task}
    return render(request, 'task_confirm_delete.html', context)

@login_required
def task_complete(request, pk):
    """Mark task as completed"""
    task = get_object_or_404(Task, pk=pk, user=request.user)
    task.status = 'completed'
    task.save()
    messages.success(request, 'Tâche marquée comme complétée!')
    return redirect('task_list')
