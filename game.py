import os 

def make_commit(days: int):
    if days <1 :
        return os.system('git push')
    else:
        dates = f'{days} days ago'

        with open('data.txt', 'a') as file:
            file.write(f'{dates}\n')

        #Staging
        os.system('git add game.txt')
        #Commit
        os.system(f'git commit --date="'+dates+'" -m "commit"')
        

        return days * make_commit(days-1)
    

make_commit(7)