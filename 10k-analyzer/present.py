import os

def get_directory_structure(directory):
    structure = []
    for root, dirs, files in os.walk(directory):
        level = root.replace(directory, '').count(os.sep)
        indent = ' ' * 4 * level
        structure.append(f"{indent}{os.path.basename(root)}/")
        sub_indent = ' ' * 4 * (level + 1)
        for file in files:
            structure.append(f"{sub_indent}{file}")
    return '\n'.join(structure)

def read_file_contents(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

def scan_npm_project(project_root):
    src_dir = os.path.join(project_root, 'src')
    if not os.path.exists(src_dir):
        print(f"Error: 'src' directory not found in {project_root}")
        return

    # Get directory structure
    dir_structure = get_directory_structure(src_dir)
    
    print("Project Directory Structure:")
    print("=" * 40)
    print(dir_structure)
    print("=" * 40)
    print("\nFile Contents:")
    print("=" * 40)

    relevant_extensions = ('.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.less', '.html')

    for root, _, files in os.walk(src_dir):
        for file in files:
            if file.endswith(relevant_extensions):
                file_path = os.path.join(root, file)
                relative_path = os.path.relpath(file_path, src_dir)
                content = read_file_contents(file_path)
                print(f"\nFile: {relative_path}")
                print("-" * 40)
                print(content)
                print("=" * 40)

if __name__ == "__main__":
    project_root = os.getcwd()  # Assumes the script is run from the project root
    scan_npm_project(project_root)